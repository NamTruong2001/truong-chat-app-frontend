import axios from "axios";
import {ApiRoutes} from "../../constants/ApiRoutes";


export const getConversations = (page, offset) => {
    return axios.get("/message/conversations")
}

export const getMessagesByConversation = (coversationId, page, offset) => {
    return axios.get(`/message/t/${coversationId}`, {
        params: {
            page: page
            // items_per_page: offset :
        }
    })
}