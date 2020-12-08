import {ModesResponse} from "../interfaces/Modes";
import {axiosInstance} from "../../../api/api";

export const ModesApi = {
    fetchModesByPimId(pimId: number) {
        return axiosInstance.get<ModesResponse>('/modes', {params: {pimId}}).then(res => res.data.modes)
    }
}
