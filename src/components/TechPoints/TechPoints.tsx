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
import {Tip} from "./Tip/Tip";
import {TechPoint} from "./interfaces/TechPoint";
import {Mode} from "./interfaces/Modes";
import {useSelector} from "react-redux";
import {RootState} from "../../store/createStore";
import {AddTechPointReq, TechPointApi} from "./api/TechPoint.api";
import {SubsystemApi} from "../../framework/Subsystems/api/getSubsystems.api";
import {Subsystem, System} from "../../framework/Subsystems/interfaces/subsystems";
import {TechTask} from "../TechTasks/ListTechTask/interfaces/TechTaskList.interface";
import {TechTaskListApi} from "../TechTasks/ListTechTask/api/TechTasksList.api";
import {log} from "util";

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

const techTaskURL = '/techTask/getPdfTechTask';

export const TechPoints = () => {

    const classes = useStyles();

    const [docURL, setDocURL] = useState<string>();

    const [selectedTechTask, setSelectedTechTask] = useState<TechTask>();

    const [techTasksList, setTechTasksList] = useState<TechTask[]>([]);
    const [techTaskPoints, setTechTaskPoints] = useState<TechPoint[]>([]);
    const [selectedHighlight, setSelectedHighlight] = useState<number>();

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        fetchTechTasksList();
    }, [selectedTargetObjectId])

    useEffect(() => {
        console.log('changeSelectedTechTask')
        if (selectedTechTask) {
            setDocURL(`${techTaskURL}?techTaskId=${selectedTechTask._id}`);
            setTechTaskPoints(selectedTechTask.techTaskPoints);
        }
    }, [selectedTechTask])

    useEffect(() => {
        if (selectedTechTask && selectedTechTask._id){
            const newTechTask = techTasksList.find(techTask => techTask._id === selectedTechTask._id);
            if (newTechTask) setSelectedTechTask(newTechTask);
        }
    }, [techTasksList])

    const addTechPoint = async (addTechPointReq: AddTechPointReq) => {
        await TechPointApi.addTechPoint(addTechPointReq);
    }

    const fetchTechTasksList = async () => {
        if (selectedTargetObjectId) {
            setTechTasksList(await TechTaskListApi.getTechTaskListByObjectId(selectedTargetObjectId));
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
            tipText={'Добавить пункт ТЗ'}
            onOpen={transformSelection}
            onConfirm={async (name, selectedPim, selectedModeId) => {
                console.log(positionSelection)
                const position = {
                    pageNumber: positionSelection.pageNumber,
                    boundingRect: positionSelection.boundingRect
                }
                if (selectedTechTask && selectedTechTask._id) {
                    await addTechPoint({
                        description: content.text,
                        modeId: selectedModeId,
                        noPoint: name,
                        position,
                        techTaskId: selectedTechTask._id
                    })
                }
                hideTipAndSelection();
                await fetchTechTasksList();
            }}
        />
    )

    const onChangeTechTask = (event: React.ChangeEvent<{ value: unknown }>) => {
        const newTechTask = techTasksList
            .find(techTask => techTask._id === event.target.value as string)
        setSelectedTechTask(newTechTask);
    }

    const renderSelectTechTask = () => (
        <FormControl className={classes.formControl}>
            <InputLabel>Техническое задание</InputLabel>
            <Select
                placeholder={'Выберите ТЗ'}
                disabled={!selectedTargetObjectId}
                value={selectedTechTask ? selectedTechTask._id : null}
                onChange={onChangeTechTask}
            >
                {techTasksList && techTasksList.map(techTask =>
                    <MenuItem
                        key={techTask._id}
                        value={techTask._id}
                    >
                        {techTask.titleTechTask}
                    </MenuItem>)}
            </Select>
        </FormControl>
    )

    const renderPdfTechTask = () => (
        <PdfLoader url={docURL} beforeLoad={<CircularProgress/>}>
            {(pdfDocument: any) => (
                <PdfHighlighter
                    pdfDocument={pdfDocument}
                    highlights={techTaskPoints}
                    onSelectionFinished={onSelectionFinished}
                    highlightTransform={highlightTransform}
                />
            )}
        </PdfLoader>
    )

    const renderTechPointsTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Название пункта ТЗ</b>
                            </TableCell>
                            <TableCell align="right"><b>Описание</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {techTaskPoints.map((techTask) => (
                            <TableRow key={techTask._id}>
                                <TableCell component="th" scope="row">
                                    {techTask.noPoint}
                                </TableCell>
                                <TableCell align="right">{techTask.description}</TableCell>
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
                    {!selectedTechTask && <Paper style={{height: '50px'}}>
                        <h3 style={{margin: '30px'}}>Выберите объект и ТЗ, чтобы увидеть список пунктов</h3>
                    </Paper>}
                    {selectedTechTask && renderTechPointsTable()}
                </Grid>
            </Grid>
        </Grid>
    )
}
