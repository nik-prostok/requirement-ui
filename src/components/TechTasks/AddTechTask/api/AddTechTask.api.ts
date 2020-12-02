import {axiosInstance} from "../../../../api/api";

export const AddTechTaskApi = {
    getTargetObjects(bodyFormData: FormData) {
        return axiosInstance('/technicalTask', {
            method: 'post',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    }
}