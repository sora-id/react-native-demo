import { BASE_URL, API_KEY } from '@env'
import axios from 'axios'

const headers = {
    "Authorization": "Bearer " + API_KEY,
    "Content-Type": "application/json"
};

export async function createSession() {
    const payload = { is_webview: "true" }
    const response = axios({
        method: 'post',
        url: BASE_URL + 'v1/verification_sessions',
        data: payload,
        headers: headers
    });

    return response
}

export async function retrieveUser(verification_id: string) {
    const response = axios({
        method: 'get',
        url: BASE_URL + 'v1/verification_sessions/' + verification_id,
        headers: headers
    });

    return response
}
