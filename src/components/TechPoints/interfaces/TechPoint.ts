export type ScaledCoordinates = {
    x1: number;
    y1: number;

    x2: number;
    y2: number;

    width: number;
    height: number;
};

export type PositionHighLight = {
    rects: ScaledCoordinates[];
    pageNumber: number;
    boundingRect: ScaledCoordinates;
}

export type TechPoint = {
    _id: string;
    modeId: string;
    position: PositionHighLight;
    description: string;
    noPoint: string;
}

export interface TechPointRes {
    points: TechPoint[];
}
