import {axiosInstance} from "../../../api/api";
import {Pims} from "../../../framework/Pims/interfaces/pims";
import {TechPointRes} from "../interfaces/TechPoint";

export interface AddTechPointReq {
    name: string;
    description: string;
    technicalTaskSystemId: number;
    modes: number[];
    position: {
        boundingRect: {
            x1: number;
            x2: number;
            y1: number;
            y2: number;
            width: number;
            height: number;
        },
        pageNumber: number;
    }
}

export const TechPointApi = {
    addTechPoint(addTechPointReq: AddTechPointReq) {
        return axiosInstance.post('/technicalTask/point', {...addTechPointReq}).then(res => res.data)
    },
    fetchTechPoints(technicalTaskSystemId: number) {
        return axiosInstance.get<TechPointRes>('/technicalTask/points', {params: {technicalTaskSystemId}}).then(res => res.data.points)
    }
}
