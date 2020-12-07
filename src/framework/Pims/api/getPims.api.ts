import {axiosInstance} from "../../../api/api";
import {Pims} from "../interfaces/pims";

export const PimsApi = {
    getTechTaskListByObjectId(objectId: string) {
        return axiosInstance.get<Pims>('/pims', {params: {objectId}}).then(res => res.data.pims)
    }
}