import {axiosInstance} from "../../../../api/api";

export const AddDocsApi = {
    addTechTask(bodyFormData: FormData) {
        return axiosInstance('/techTask', {
            method: 'post',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    },

    addPim(bodyFormData: FormData) {
        return axiosInstance('/pims', {
            method: 'post',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    }
}
