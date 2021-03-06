import {axiosInstance} from "../../../../../api/api";
import {TechTask} from "../interfaces/TechTaskList.interface";

export const TechTaskListApi = {
    getTechTaskListByObjectId(targetObjectId: string) {
        return axiosInstance.get<TechTask[]>('/techTask/getByObjectId', {params: {targetObjectId}}).then(res => res.data)
    }
}
