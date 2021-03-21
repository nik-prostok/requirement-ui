import {TechPoint} from "../../../TechPoints/interfaces/TechPoint";

export interface TechTask {
    titleTechTask: string;
    _id: string;
    nameDoc: string;
    techTaskPoints: TechPoint[];
    targetObjectId: string;
}
