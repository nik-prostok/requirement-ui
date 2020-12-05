import * as React from 'react';

// eslint-disable-next-line import/no-webpack-loader-syntax
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";

import {
    PdfLoader,
    PdfHighlighter,
    Highlight,
    Popup,
    AreaHighlight,
    setPdfWorker,
} from "react-pdf-highlighter";
import {useState} from "react";
import {T_Comment, T_Highlight, T_HighlightComment, T_NewHighlight} from "../../../types/react-pdf-highlighter/types";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Input,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Theme,
    Tooltip
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ReactTooltip from "react-tooltip";
import {Tip} from "../../framework/Tip/Tip";
import {TechPoint, TechPointWithId} from "./interfaces/TechPoint";

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

    const [docURL, setDocURL] = useState<string>('/technicalTask/download?technicalTaskId=131');
    const [techTaskPoints, setTechTaskPoints] = useState<TechPointWithId[]>([]);

    const getNextId = () => String(Math.random()).slice(2);

    const scrollViewerTo = (highlight: any) => {
    };

    const getHighlightById = (id: string) => {
        return techTaskPoints.find(techPoint => techPoint.id === id);
    }

    const addHighlight = (techPoint: TechPoint) => {

        console.log("Saving highlight", techPoint);

        setTechTaskPoints(prevTechPoints => [...prevTechPoints, {...techPoint, id: getNextId()}])

    }

    const updateHighlight = (highlightId: string, position: Object, content: Object) => {
        console.log("Updating highlight", highlightId, position, content);

        /*setTechTaskPoints()

        this.setState({
            techTaskPoints: this.state.techTaskPoints.map(h => {
                const {
                    id,
                    position: originalPosition,
                    content: originalContent,
                    ...rest
                } = h;
                return id === highlightId
                    ? {
                        id,
                        position: { ...originalPosition, ...position },
                        content: { ...originalContent, ...content },
                        ...rest
                    }
                    : h;
            })
        });*/
    }

    const HighlightPopup = () => (
        <div className="Highlight__popup">
            ПИМ: 123
        </div>
    );

    const highlightTransform = (
        highlight: TechPointWithId,
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

    const onSelectionFinished = (position: any,
                                 content: any,
                                 hideTipAndSelection: () => void,
                                 transformSelection: any) => (
        <Tip
            tipText={'Добавить пункт ТЗ'}
            onOpen={transformSelection}
            onConfirm={() => {
                addHighlight({text: content, position});
                hideTipAndSelection();
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
