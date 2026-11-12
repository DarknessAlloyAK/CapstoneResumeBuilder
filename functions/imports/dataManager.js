import axios from "axios";

const baseURL = 'https://resume-maker-a859b-default-rtdb.firebaseio.com/accounts'

export async function CreateAccountInfo(upload) {
    if (!upload?.location || upload.data === undefined || !upload.idToken) {
        throw new Error("CreateAccountInfo requires location, data, and idToken")
    }

    return axios.put(
        `${baseURL}/${encodeURIComponent(upload.location)}.json`,
        upload.data,
        { params: { auth: upload.idToken } }
    )
}

export async function GetAccountInfo(email) {
    const { data } = await axios.get(`${baseURL}.json`)

    for (const key in data) {
        if (data[key].accountData.Email == email) {
            return data[key]
        } else {
            return null
        }
    }
}


export async function UpdateAccountInfo(id, path, newinfo) {
    if (!id || !path || newinfo === undefined) {
        throw new Error("UpdateAccountInfo requires id, path, and newinfo")
    }
    console.log("Testing")
    return axios.put(
        `${baseURL}/${id}/${path}.json`,
        newinfo
    )
}