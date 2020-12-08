import {axiosInstance} from "../../../api/api";
import {PositionHighLight, TechPointRes} from "../interfaces/TechPoint";

export interface AddTechPointReq {
    name: string;
    description: string;
    technicalTaskSystemId: number;
    modes: number[];
    position: PositionHighLight;
}

export const TechPointApi = {
    addTechPoint(addTechPointReq: AddTechPointReq) {
        return axiosInstance.post('/technicalTask/point', {...addTechPointReq}).then(res => res.data)
    },
    fetchTechPoints(technicalTaskSystemId: number) {
        return axiosInstance.get<TechPointRes>('/technicalTask/points', {params: {technicalTaskSystemId}}).then(res => res.data.points)
    }
}
