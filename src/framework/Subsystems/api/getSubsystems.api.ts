import {axiosInstance} from "../../../api/api";
import {Subsystems, Systems} from "../interfaces/subsystems";

export const SubsystemApi = {
    getSubsystemsByObjectId(objectId: string) {
        return axiosInstance.get<Subsystems>('/subsystems', {params: {objectId}}).then(res => res.data.subsystems)
    },
    getSubsystemsByTechTaskId(technicalTaskId: number) {
        return axiosInstance.get<Systems>('/technicalTask/system', {params: {technicalTaskId}}).then(res => res.data.systems)
    }
}
