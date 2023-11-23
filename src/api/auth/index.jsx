import axios from "axios";
import {ApiRoutes} from "../../constants/ApiRoutes";

export const login = async (formData) => {
    return axios.post(ApiRoutes.LOGIN, formData,
        {
            headers: {"Content-Type": "multipart/form-data"}
        }
    )
}