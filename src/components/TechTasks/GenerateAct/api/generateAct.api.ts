import {axiosInstance} from "../../../../api/api";

export const GenerateActApi = {
    generateAct(pimId: number, subsystemId: number) {
        return axiosInstance.get('/api', {params: {pimId, subsystemId}}).then(res => res.data.pims)
    }
}
