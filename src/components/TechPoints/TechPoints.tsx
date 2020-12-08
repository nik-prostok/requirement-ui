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
    CircularProgress,
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
        setTechTaskPoints(await TechPointApi.fetchTechPoints(121));
    }

    const HighlightPopup = () => (
        <div className="Highlight__popup">
            ПИМ: 123
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
                popupContent={<HighlightPopup/>}
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
            onConfirm={(description, selectedPim, selectedModeId) => {
                const modes = [selectedModeId];
                const position = {
                    pageNumber: positionSelection.pageNumber,
                    boundingRect: positionSelection.boundingRect,
                }
                addTechPoint({description, technicalTaskSystemId: 121, modes, name: content.text, position})
                hideTipAndSelection();
                fetchTechPoint();
            }}
        />
    )

    const renderPdfTechTask = () => (
        <PdfLoader url={docURL} beforeLoad={<CircularProgress/>}>
            {(pdfDocument: any) => (
                <PdfHighlighter
                    pdfDocument={pdfDocument}
                    scrollRef={() => {
                    }}
                    highlights={techTaskPoints}
                    onSelectionFinished={onSelectionFinished}
                    highlightTransform={highlightTransform}
                />
            )}
        </PdfLoader>
    )

    /*const renderTechPointsTable = () => {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Название ТЗ</b>
                            </TableCell>
                            <TableCell align="right"><b>ID</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {techTaskPoints.map(() => (
                            <TableRow key={techTask.id}>
                                <TableCell component="th" scope="row">
                                    {techTask.name}
                                </TableCell>
                                <TableCell align="right">{techTask.id}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }*/

    return (
        <Box style={{
            height: "86vh",
            width: "50vw",
            position: "relative"
        }}>
            {renderPdfTechTask()}
        </Box>
    )
}
