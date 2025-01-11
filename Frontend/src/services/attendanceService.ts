import { apiRequest } from "./apiClient";  

const recordAttendance = async (employeeId: string, date: string, status: string) => {
    return apiRequest({
        method : 'POST', 
        url:'/attendance', 
        data : {employeeId, date, status}
    });
}
  
  export  {
    recordAttendance,
  };
  