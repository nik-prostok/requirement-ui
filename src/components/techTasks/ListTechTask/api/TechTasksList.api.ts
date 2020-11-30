import {axiosInstance} from "../../../../api/api";
import {ListTechTaskResponse} from "../interfaces/TechTaskList.interface";

export const TechTaskListApi = {
    getTechTaskListByObjectId(objectId: string) {
        return axiosInstance.get<ListTechTaskResponse>('/technicalTasks', {params: {objectId}}).then(res => res.data.technicalTasks)
    }
}
