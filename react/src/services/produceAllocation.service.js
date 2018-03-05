
import axios from 'axios'

let nodeServer = 'http://localhost:8091'

const produceAllocationService = {
    readAll: () => {
        const config = {
            method: 'GET'
        }
        return axios(`${nodeServer}/api/produce`, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler)
    },
    create: (data) => {
        const config = {
            method: 'POST',
            data: data
        }
        return axios(`${nodeServer}/api/produce/`, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler)
    },
    delete: (id) => {
        const config = {
            method: 'DELETE'
        }
        return axios(`${nodeServer}/api/produce/${id}`, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler)
    },
    update: (id, data) => {
        const config = {
            method: 'PUT',
            data: data
        }
        return axios(`${nodeServer}/api/produce/${id}`, config)
            .then(responseSuccessHandler)
            .catch(responseErrorHandler)
    },
}

const responseSuccessHandler = response => response.data;
const responseErrorHandler = error => {
    console.log(error);
    return Promise.reject(error);
}

export default produceAllocationService
