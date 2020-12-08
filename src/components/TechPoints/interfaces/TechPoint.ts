export type ScaledCoordinates = {
    x1: number;
    y1: number;

    x2: number;
    y2: number;

    width: number;
    height: number;
};

export type Position = {
    boundingRect: ScaledCoordinates;
    pageNumber: number;
}

export type TechPoint = {
    id: number;
    position: Position;
    description: string;
    name: string;
}

export interface TechPointRes {
    points: TechPoint[];
}
