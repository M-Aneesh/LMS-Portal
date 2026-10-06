import api from "./axios";

export const fetchAllCourses = async()=>{
    let {data} = await api.get('/course/get-courses');
    return data
}
export const fetchSingleCourse = async(id)=>{
    let {data} = await api.get(`/course/get-course/${id}`)
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
export const editCourse = async (id, payload) => {
    const { data } = await api.put( `/course/edit-course/${id}`, payload);
    return data;
};
export const fetchEnrollCourse = async(id)=>{
    let {data} = await api.get(`/course/get-course-content/${id}`)
    return data
}