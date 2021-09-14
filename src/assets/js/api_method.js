import dayjs from 'dayjs'
import axios from 'axios'

export const postFormData = (dataObj, millisecond) => {
    const newObj = {...dataObj}
    // if(millisecond){
    //     const now = dayjs()
    //     newObj.start = now.subtract(millisecond, 'millisecond').format('YYYY-MM-DDTHH:mm:ss') + '+08:00'
    //     newObj.end = now.format('YYYY-MM-DDTHH:mm:ss') + '+08:00'
    // }
    if(newObj && newObj.time_unit && newObj.time_step){
        const startTime = dayjs().subtract(newObj.time_step, newObj.time_unit)
        newObj.start = startTime.format('YYYY-MM-DDTHH:mm:ss') + '+08:00'
        newObj.end = dayjs().format('YYYY-MM-DDTHH:mm:ss') + '+08:00'
        delete newObj.time_unit
        delete newObj.time_step
    }

    const formData = new FormData()
    Object.keys(newObj).forEach(key => {
        formData.append(key, newObj[key])
    })
    return formData
}

export const api_method = {
    get: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            })
            .then((response) => {
                if(response.status === 200){
                    resolve(response.data)
                }else{
                    reject(response)
                }
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    post: (url, params) => {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    put: (url, params) => {
        return new Promise((resolve, reject) => {
        axios.put(url, params)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    },

    delete: (url, params) => {
        return new Promise((resolve, reject) => {
        axios.delete(url)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}

export default api_method