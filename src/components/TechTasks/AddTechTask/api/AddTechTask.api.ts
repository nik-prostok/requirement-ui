import {axiosInstance} from "../../../../api/api";

export const AddTechTaskApi = {
    addTechTask(bodyFormData: FormData) {
        return axiosInstance('/techTask', {
            method: 'post',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    }
}
