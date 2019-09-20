import { axios } from '@/utils/request'
import qs from 'qs'
export function setServers(parameter) {
    return axios({
      url: '/sysConfig/add',
      method:'post' ,
      contentType: "application/json",
      data: qs.stringify(parameter)
    })
  }
  export function getServers(parameter) {
    return axios({
      url: '/sysConfig/list',
      method:'post' ,
      data: qs.stringify(parameter)
    })
  }