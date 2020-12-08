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
    Box, Button,
    CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Theme,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Tip} from "./Tip/Tip";
import {TechPoint} from "./interfaces/TechPoint";
import {Mode} from "./interfaces/Modes";
import {useSelector} from "react-redux";
import {RootState} from "../../store/createStore";
import {AddTechPointReq, TechPointApi} from "./api/TechPoint.api";

setPdfWorker(PDFWorker);

export interface HighlightPopupProps {
    techPoint: TechPoint;
}

const useStyles = makeStyles((theme: Theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

export const TechPoints = () => {

    const classes = useStyles();

    const [docURL, setDocURL] = useState<string>('/technicalTask/download?technicalTaskId=152');
    const [techTaskPoints, setTechTaskPoints] = useState<TechPoint[]>([]);
    const [selectedHighlight, setSelectedHighlight] = useState<number>();

    const {selectedTargetObjectId} = useSelector((state: RootState) => {
        return {
            selectedTargetObjectId: state.targetObjects.selectedTargetObject.selectedTargetObjectId,
        }
    })

    useEffect(() => {
        fetchTechPoint();
    }, [])

    const addTechPoint = async (addTechPointReq: AddTechPointReq) => {
        await TechPointApi.addTechPoint(addTechPointReq);
    }

    const fetchTechPoint = async () => {
        const techPoints = await TechPointApi.fetchTechPoints(121);
        const newTechPoints = techPoints.map(techPoint => {
            techPoint.position.rects = [techPoint.position.boundingRect]
            return techPoint;
        })
        setTechTaskPoints(newTechPoints);
    }

    const HighlightPopup = ({techPoint}: HighlightPopupProps) => (
        <div className="Highlight__popup">
            {techPoint.description}
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
            onConfirm={ async (description, selectedPim, selectedModeId) => {
                const modes = [selectedModeId];
                const position = {
                    pageNumber: positionSelection.pageNumber,
                    rects: positionSelection.rects,
                    boundingRect: positionSelection.boundingRect
                }
                await addTechPoint({description, technicalTaskSystemId: 121, modes, name: content.text, position})
                hideTipAndSelection();
                console.log(positionSelection);
                await fetchTechPoint();
            }}
        />
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
                            <TableCell align="right"><b>Открыть</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {techTaskPoints.map((techTask) => (
                            <TableRow key={techTask.id}>
                                <TableCell component="th" scope="row">
                                    {techTask.name}
                                </TableCell>
                                <TableCell align="right">{techTask.description}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => setSelectedHighlight(techTask.id)}>Открыть
                                    </Button>
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
            <Grid item xs={6}>
                {renderTechPointsTable()}
            </Grid>
        </Grid>
    )
}
