import {axiosInstance} from "../../../api/api";
import {PositionHighLight, ScaledCoordinates, TechPointRes} from "../interfaces/TechPoint";

export interface AddTechPointReq {
    noPoint: string;
    description: string;
    modeId: string;
    position: {
        boundingRect: ScaledCoordinates;
        pageNumber: number;
    };
}

export const TechPointApi = {
    addTechPoint(addTechPointReq: AddTechPointReq) {
        return axiosInstance.post('/technicalTask/point', {...addTechPointReq}).then(res => res.data)
    },
    fetchTechPoints(technicalTaskSystemId: number) {
        return axiosInstance.get<TechPointRes>('/technicalTask/points', {params: {technicalTaskSystemId}}).then(res => res.data.points)
    }
}
