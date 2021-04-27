import {axiosInstance} from "../../../api/api";
import {ScaledCoordinates} from "../../TechPoints/interfaces/TechPoint";

export interface AddModeReq {
    pimId: string;
    modeNo: string;
    modeName: string;
    description: string;
    position: {
        boundingRect: ScaledCoordinates;
        pageNumber: number;
    };
}

export const PimsModeApi = {
    addMode(addModeReq: AddModeReq) {
        return axiosInstance.post('/modes', {...addModeReq}).then(res => res.data)
    },
}
