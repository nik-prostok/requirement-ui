import * as React from 'react';

// eslint-disable-next-line import/no-webpack-loader-syntax
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";

import {
    PdfLoader,
    PdfHighlighter,
    Highlight,
    Popup,
    setPdfWorker,
} from "react-pdf-highlighter";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    CircularProgress, FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {RootState} from "../../store/createStore";
import {TechTaskListApi} from "../Docs/TechTask/ListTechTask/api/TechTasksList.api";
import {AddTechPointReq, TechPointApi} from "../TechPoints/api/TechPoint.api";
import {TechPoint} from "../TechPoints/interfaces/TechPoint";
import {Mode, Pim} from "../Docs/PiMs/ListPiMs/interfaces/pims.interface";
import {PimsApi} from "../Docs/PiMs/ListPiMs/api/getPims.api";
import {Tip} from "./Tip/Tip";
import {AddModeReq, PimsModeApi} from "./api/pims.api";

setPdfWorker(PDFWorker);

export interface HighlightPopupProps {
    techPoint: TechPoint;
}

const useStyles = makeStyles((theme: Theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    formControl: {
        minWidth: 240,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

const pimPdfURL = '/pims/getPdfPim';

export const Pims = () => {

    const classes = useStyles();

    const [docURL, setDocURL] = useState<string>();

    const [selectedPim, setSelectedPim] = useState<Pim>();

    const [pimList, setPimsList] = useState<Pim[]>([]);
    const [modesPim, setModesPim] = useState<Mode[]>([]);
    const [selectedHighlight, setSelectedHighlight] = useState<number>();

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        if (selectedPim && selectedPim.modes) {
            const newTechPoints = selectedPim.modes.map(mode => {
                mode.position.rects = [mode.position.boundingRect]
                return mode;
            })
            setModesPim(newTechPoints);
            setDocURL(`${pimPdfURL}?pimId=${selectedPim._id}`);
        }
    }, [selectedPim])

    useEffect(() => {
        fetchPimsList();
    }, [selectedTargetObjectId])

    useEffect(() => {
        if (selectedPim && selectedPim._id) {
            const newTechTask = pimList.find(techTask => techTask._id === selectedPim._id);
            if (newTechTask) setSelectedPim(newTechTask);
        }
    }, [pimList])

    const addMode = async (addModeReq: AddModeReq) => {
        await PimsModeApi.addMode(addModeReq);
    }

    const fetchPimsList = async () => {
        if (selectedTargetObjectId) {
            setPimsList(await PimsApi.getPimsByObjectId(selectedTargetObjectId));
        }
    }

    const HighlightPopup = ({techPoint}: HighlightPopupProps) => (
        <div className="Highlight__popup">
            {techPoint.noPoint}
        </div>
    );

    const highlightTransform = (
        highlight: TechPoint,
        index: string | number | null | undefined,
        setTip: (arg0: any, arg1: (highlight: any) => any) => any,
        hideTip: any,
        viewportToScaled: (arg0: any) => any,
        screenshot: (arg0: any) => any,
        isScrolledTo: any) => {

        const HighlightComponent = (
            <Highlight
                isScrolledTo={isScrolledTo}
                position={highlight.position}
            />
        );

        return (
            <Popup
                popupContent={<HighlightPopup techPoint={highlight}/>}
                onMouseOver={(popupContent: any) =>
                    setTip(highlight, highlight => popupContent)
                }
                onMouseOut={hideTip}
                key={index}
                children={HighlightComponent}
            />
        );
    }

    const onSelectionFinished = (positionSelection: any,
                                 content: any,
                                 hideTipAndSelection: () => void,
                                 transformSelection: any) => (
        <Tip
            selectedTargetObjectId={selectedTargetObjectId}
            tipText={'Добавить режим'}
            onOpen={transformSelection}
            onConfirm={async (nameMode) => {
                console.log(positionSelection)
                const position = {
                    pageNumber: positionSelection.pageNumber,
                    boundingRect: positionSelection.boundingRect
                }
                await addMode({
                    description: content.text,
                    modeNo: '123',
                    modeName: 'Режим №1',
                    position,
                    // @ts-ignore
                    pimId: selectedPim?._id
                })
                hideTipAndSelection();
                await fetchPimsList();
            }}
        />
    )

    const onChangeTechTask = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newTechTask = pimList
            .find(techTask => techTask._id === event.target.value as string)
        setSelectedPim(newTechTask);
    }

    const renderSelectTechTask = () => (
        <FormControl className={classes.formControl}>
            <InputLabel>ПиМ</InputLabel>
            <Select
                placeholder={'Выберите документ ПиМ'}
                disabled={!selectedTargetObjectId}
                value={selectedPim ? selectedPim._id : null}
                onChange={onChangeTechTask}
            >
                {pimList && pimList.map(pim =>
                    <MenuItem
                        key={pim._id}
                        value={pim._id}
                    >
                        {pim.namePiM}
                    </MenuItem>)}
            </Select>
        </FormControl>
    )

    const renderPdfTechTask = () => (
        <PdfLoader url={docURL} beforeLoad={<CircularProgress/>}>
            {(pdfDocument: any) => (
                <PdfHighlighter
                    pdfDocument={pdfDocument}
                    highlights={modesPim}
                    onSelectionFinished={onSelectionFinished}
                    highlightTransform={highlightTransform}
                />
            )}
        </PdfLoader>
    )

    const renderModesTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Номер режима</b>
                            </TableCell>
                            <TableCell>
                                <b>Название режима</b>
                            </TableCell>
                            <TableCell align="right"><b>Содержание</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {modesPim.map((mode) => (
                            <TableRow key={mode._id}>
                                <TableCell component="th" scope="row">
                                    {mode.modeNo}
                                </TableCell>
                                <TableCell align="right">{mode.modeName}</TableCell>
                                <TableCell>
                                    {mode.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Box style={{
                    height: "88vh",
                    width: "45vw",
                    position: "relative"
                }}>
                    {renderPdfTechTask()}
                </Box>
            </Grid>
            <Grid container item xs={6} direction={'column'} spacing={3}>
                <Grid item component={Paper}>
                    <Grid item xs={12}>
                        {renderSelectTechTask()}
                    </Grid>
                </Grid>
                <Grid item style={{paddingLeft: 0, paddingRight: 0}}>
                    {!selectedPim && <Paper style={{height: '50px'}}>
                        <h3 style={{margin: '30px'}}>Выберите объект и ПиМ, чтобы увидеть список добавленных
                            режимов</h3>
                    </Paper>}
                    {selectedPim && renderModesTable()}
                </Grid>
            </Grid>
        </Grid>
    )
}
