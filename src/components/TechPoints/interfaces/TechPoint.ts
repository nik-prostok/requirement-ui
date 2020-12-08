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
    id: number;
    position: PositionHighLight;
    description: string;
    name: string;
}

export interface TechPointRes {
    points: TechPoint[];
}
