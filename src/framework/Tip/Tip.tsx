import * as React from 'react';

import "./Tip.style.css";
import {Button} from "@material-ui/core";

interface TipState {
    compact: boolean,
    text: string,
    emoji: string
};

interface TipProps {
    onConfirm: () => void,
    onOpen: () => void,
    onUpdate?: () => void,
    tipText: string;
};

export class Tip extends React.Component<TipProps, TipState> {

    constructor(props: TipProps | Readonly<TipProps>) {
        super(props);
        this.state = {
            compact: true,
            text: "",
            emoji: ""
        }
    }

    // for TipContainer
    componentDidUpdate(nextProps: TipProps, nextState: TipState) {
        const {onUpdate} = this.props;

        if (onUpdate && this.state.compact !== nextState.compact) {
            onUpdate();
        }
    }

    render() {
        const {onConfirm, onOpen, tipText} = this.props;
        const {compact, text} = this.state;

        return (
            <div className="Tip">
                {compact ? (
                    <div
                        className="Tip__compact"
                        onClick={() => {
                            onOpen();
                            this.setState({compact: false});
                        }}
                    >
                        {tipText}
                    </div>
                ) : (
                    <form
                        className="Tip__card"
                    >
                        <Button variant={"contained"} onClick={event => {
                            event.preventDefault();
                            onConfirm();
                        }}>Сохранить</Button>
                    </form>
                )}
            </div>
        );
    }
}
