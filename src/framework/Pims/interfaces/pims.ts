export interface Pims {
    pims: Pim[];
}

export interface Mode {
    _id: string;
    modeNo: string;
    modeName: string;
    description: string;
}

export interface Pim {
    namePiM: string;
    description: string;
    modes: Mode[];
    _id: string;
}
