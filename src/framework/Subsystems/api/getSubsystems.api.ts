import {axiosInstance} from "../../../api/api";
import {Subsystems} from "../interfaces/subsystems";

export const SubsystemApi = {
    getSubsystemsByObjectId(objectId: string) {
        return axiosInstance.get<Subsystems>('/subsystems', {params: {objectId}}).then(res => res.data.subsystems)
    }
}
