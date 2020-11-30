import {axiosInstance} from "../../../../api/api";
import {TargetObjectsResponse} from "../interfaces/TargetObject";

export const TargetObjectsApi = {
    getTargetObjects() {
        return axiosInstance.get<TargetObjectsResponse>('/objects').then(res => res.data.objects)
    }
}
