import api from "./api.js";

const checkToken = async () => {
    try {
        const token = localStorage.getItem('authToken')
                
        const response = await api.get(`/api/users/verifyToken`, {headers: {authorization: token, },});
        
        return response.status

    } catch (error) {

        console.error("Token validation failed:", error);
        console.log('status', error.response.status);
        return error.response.status
    }
};

export default checkToken;
