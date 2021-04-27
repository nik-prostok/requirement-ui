import {axiosInstance} from "../../../../../api/api";
import {Pim, PimsInterface} from "../interfaces/pims.interface";

export const PimsApi = {
    getPimsByObjectId(targetObjectId: string) {
        return axiosInstance.get<Pim[]>('/pims/getPimByObjectId', {params: {targetObjectId}}).then(res => res.data)
    }
}
