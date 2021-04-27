import {PositionHighLight} from "../../../../TechPoints/interfaces/TechPoint";

export interface PimsInterface {
    pims: Pim[];
}

export interface Mode {
    _id: string;
    modeNo: string;
    modeName: string;
    position: PositionHighLight;
    description: string;
}

export interface Pim {
    nameDoc: string;
    namePiM: string;
    description: string;
    modes: Mode[];
    _id: string;
}
