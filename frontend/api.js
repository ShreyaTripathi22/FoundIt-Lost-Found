import axios from "axios";

//const URL = "http://localhost:3000"
const URL = "http://localhost:3000/api"


export async function getPosts() {
    const response = await axios.get(`${URL}/found`)

    if(response.status === 200){
        return response.data
    }else{
        return
    }
    
}

export async function getPost(id) {
    const response = await axios.get(`${URL}/found/${id}`)

    if(response.status === 200){
        return response.data
    }else{
        return
    }
    
}
export async function createPost(post) {
    const response = await axios.post(`${URL}/found`, post)
    return response
 
}


export async function deletePost(id) {
    const response = await axios.delete(`${URL}/found/${id}`)
    return response
 
}

//USER FUNCTIONS

// export async function getUser(id) {
//     const response = await axios.get(`${URL}/users/${id}`)

//     if(response.status === 200){
//         return response.data
//     }else{
//         return
//     }
    
// }
export async function createUsers(user) {
    const response = await axios.post(`${URL}/users`, user)
    return response
 
}


// export async function deleteUser(id) {
//     const response = await axios.delete(`${URL}/users/${id}`)
//     return response
 
// }

// export async function verifyUser(user){
//     const response = await axios.post(`${URL}/users/login`,user)
//     if(response.data.success){
//         return response.data.token
//     }else{
//         return
//     }
// }
export async function verifyUser(user) {
  try {
    const response = await axios.post(`${URL}/users/login`, user);

    if (response.data.success) {
      return { success: true, token: response.data.token };
    } else {
      return {
        success: false,
        message: response.data.message || "Login failed"
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Server error. Please try again later."
    };
  }
}

// EMAIL FUNCTION
export async function sendClaimEmail(data) {
    const response = await axios.post(`${URL}/email/claim`, data);
    return response;
}

