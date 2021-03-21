import {axiosInstance} from "../../../api/api";
import {Pim, Pims} from "../interfaces/pims";

export const PimsApi = {
    getPimsByObjectId(targetObjectId: string) {
        return axiosInstance.get<Pim[]>('/pims/getPimByObjectId', {params: {targetObjectId}}).then(res => res.data)
    }
}
