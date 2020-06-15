import axios from 'axios'

var service = axios.create({
    baseURL:"http://10.3.135.29:3000/"
})

export default service