import axios from "axios"
axios.defaults.baseURL="http://localhost:3000/api"

const back=axios.create({
    baseURL:"http://localhost:3000/api"
})

export default back;