import { API } from "../Api"
import Axios from 'axios'

const Index = async () => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return await Axios.get(`${API}types`, config)
}


const Store = async (data) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return await Axios.post(`${API}types`, data, config)
}

const Update = async (data, uid) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return await Axios.put(`${API}types/${uid}`, data, config)
}

const Delete = async (uid) => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }

    return await Axios.delete(`${API}types/${uid}`, config)
}



const Types = {
    Index,
    Store,
    Update,
    Delete,
}

export default Types