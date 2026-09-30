import axios from 'axios'
export const BASE_URL= 'https://mockapi-mauve.vercel.app/api/v1'

//use create method to create axios instance
const api = axios.create({
    baseURL:BASE_URL,
    headers:{"Content-Type":"application/json"},
});

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("TOKEN")
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }else{
        console.log('Something went wrong...');
        
    }
    return config
})
api.interceptors.response.use((response)=>{
      return response 
      },
       (error)=>{
        console.error(error , error.response?.status , error.response?.data)
        return Promise.reject(error)
    }
)

export default api;
