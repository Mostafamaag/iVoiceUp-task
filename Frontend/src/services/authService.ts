import { apiRequest } from "./apiClient";

const login = async (email: string, password: string) => {

    return apiRequest({
        method: 'POST',
        url:'/auth/login',
        data: {email, password}
    })
};
  
export {
    login
}
  
  