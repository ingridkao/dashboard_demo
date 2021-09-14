import request from './api_method'
import axios from 'axios'

export const FetchTagetAllList = (path, vueInstance) => {
    return new Promise((resolve, reject) => {
        axios.get(path).then(response => {
            if(response.status === 200 && response.data){
                resolve(response.data)
            }else{
                reject(response) 
            }
        })
        .catch(error => {
            // if(error && error.response.status === 401){
            //         FetchTagetAllList(path, vueInstance)
            // }else{
            //     reject(error)
            // }
        })
    })
}

export const ResponseCatch = (error, vueInstance) => {
    return new Promise((resolve, reject) => {

        const {response} = error.response
        if(response && response.status === 401){
                resolve(success)
        }else if(response && response.data){
            vueInstance.$message.error(response.data.error)
            reject(response)
        }else{
            reject(error)
        }
    })
}

export const EditPromptOnlyNameTaget = (vueInstance, msg, inputValue) => {
    return new Promise(resolve => {
        vueInstance.$prompt(`${vueInstance.$t("Enter")}${vueInstance.$t("Name")}`, msg, {
            confirmButtonText: vueInstance.$t("Save"),
            cancelButtonText: vueInstance.$t("Cancel"),
            inputPattern: /[\u4e00-\u9fa5]+$|^[a-zA-Z\s]?/,
            inputErrorMessage: vueInstance.$t("FormatError"),
            inputValue: inputValue.name
        }).then(({ value }) => {
            vueInstance.$message({
                type: 'success',
                message: '成功修改主題分組: ' + value
            });
            resolve(value)
        }).catch(error => {
            console.log(error);
        })
    })
}
export const DeleteTaget = (path, vueInstance) => {
    return new Promise(resolve => {
        vueInstance.$store.commit('setGlobalLoading', true)
        axios.delete(path).then(success => {
            vueInstance.$message({type: 'success', message: vueInstance.$t("SuccessRemove")})
            resolve(success)
        }).catch(error => { 
            vueInstance.$message.error(error) 
        }).finally(r => { 
            vueInstance.$store.commit('setGlobalLoading', false)
        })
    })
}

export const DeleteBatch = (dataArray, vueInstance) => {
    if(dataArray.length === 0)return
    return new Promise(resolve => {
        const APIs = dataArray.map(dataTarget => {
            if(dataTarget.id) return axios.delete(`/api_server/manager/authuser/${dataTarget.id}`)
        })
        if(APIs.length > 0){
            vueInstance.$store.commit('setGlobalLoading', true)
            axios.all(APIs).then((response) => {
                vueInstance.$message({type: 'success', message: vueInstance.$t("SuccessRemove")})
                resolve(response)
            }).catch(error => { 
                console.log(error);
                vueInstance.$message.error(error) 
            }).finally(r => { 
                vueInstance.$store.commit('setGlobalLoading', false)
            })
        }
    })
}