import * as React from 'react';

// eslint-disable-next-line import/no-webpack-loader-syntax
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";

import {
    PdfLoader,
    PdfHighlighter,
    Tip,
    Highlight,
    Popup,
    AreaHighlight,
    setPdfWorker,

} from "react-pdf-highlighter";
import {useState} from "react";
import {T_Highlight} from "../../../types/react-pdf-highlighter/types";
import {Container} from "@material-ui/core";

setPdfWorker(PDFWorker);

interface Created {
    scrollTo: any;
}


export const TechPoints = () => {

    const [docURL, setDocURL] = useState<string>('/technicalTask/download?technicalTaskId=131');
    const [highlights, setHighlights] = useState<T_Highlight[]>([]);

    const scrollViewerTo = (highlight: any) => {
    };

    const getHighlightById = (id: string) => {
        return highlights.find(highlight => highlight.id === id);
    }

    return (
        <div style={{
            height: "86vh",
            width: "50vw",
            position: "relative"
        }}>
            <PdfLoader url={docURL}>
                {(pdfDocument: any) => (
                    <PdfHighlighter
                        pdfDocument={pdfDocument}
                        scrollRef={() => {
                        }}
                        highlights={highlights}
                    />
                )}
            </PdfLoader>
        </div>
    )
}
