import { apiRequest } from "./apiClient";

const fetchEmployees = async (date: string) => {
    return apiRequest({
        method: 'GET',
        url: `/employee/${date}`,
    })
};


const addEmployee = async (email: string, name: string, password: string) => {
    return apiRequest({
        method: 'POST',
        url: '/employee',
        data: { name, email, password }
    })
};

const editEmployee = async (id: string, name: string, email: string) => {
    return apiRequest({
        method: 'PUT',
        url: `/employee/${id}`,
        data: { name, email }
    })
};

const deleteEmployee = async (id: string) => {
    return apiRequest({
        method: 'DELETE',
        url: `/employee/${id}`,
    })
};

export {
    fetchEmployees,
    addEmployee,
    deleteEmployee,
    editEmployee
};
