import api from "./axios";
/* @Create Register 
HTTP METHOD IS GET 
RESPONSE STATUS CODE is 200 
RESPONSE STATUS TEXT is Ok 
this ADMIN  view
DOES not  have request payload 
response has data or not 
*/

export const fetchAllUsers = async () => {
  let { data } = await api.get("/auth/get-all-user-dashboard");
  return data;
};


export const updateRole = async(payload) =>{
  let {data} = await api.put("/auth/update-user-roles" , payload);
  return data;
}

export const deleteUser = async(id) =>{
  let {data} = await api.delete(`/auth/delete-user/${id}`);
  return data;
}