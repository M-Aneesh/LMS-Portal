import api from "./axios";

export const fetchAllCourses = async()=>{
    let {data} = await api.get('/course/get-courses');
    return data
}
export const fetchAllCoursesAdmin = async()=>{
    let {data} = await api.get('/course/get-all-course-dashboard')
    return data;
}
export const createCourse = async(payload)=>{
    let {data} = await api.post('/course/create-course',payload)
    return data;
}