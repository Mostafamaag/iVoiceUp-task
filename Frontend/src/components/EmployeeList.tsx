import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from '../services/employeeService.ts'
import AttendanceForm from "./AttendanceForm.tsx";
import { DateInput } from "./Date.tsx";
import EditEmployee from "./EditEmployee.tsx";
import AddEmployee from "./AddEmployee.tsx";


const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const [isEdit, setIsEdit] = useState(null);
    const [isAdd, setIsAdd] = useState(false);

    const loadEmployees = async () => {

        try {
            const data: any = await fetchEmployees(date);
            setEmployees(data);
        } catch (error) {
            console.log(error.response.data.message)
            alert(error.response.data.message);
        }

    };

    const handleDeleteEmployee = async (id: string) => {
        try {
            const data: any = await deleteEmployee(id);
            // alert("Delete Employee successfully");
            setEmployees(prevEmployees => {
                return prevEmployees.filter((employee) => employee.id !== id);
            })

        } catch (err) {
            console.log(err);
            alert("Error while deleting employee");
        }

    };

    useEffect(() => {
        loadEmployees();
    }, [date]);

    return (
        <div className="p-8">
            {(isEdit || isAdd) ?
                (
                    <>
                        {isAdd ?

                            <AddEmployee setIsAdd={setIsAdd} setEmployees={setEmployees} />
                            :
                            <EditEmployee employee={isEdit} setEditingEmployee={setIsEdit} setEmployees={setEmployees} />
                        }
                    </>


                )
                :
                (
                    <>
                        <h2 className="text-3xl font-bold mb-6 text-gray-700">Employee List</h2>
                        <DateInput date={date} setDate={setDate} />
                        <table className="w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-6 text-left text-gray-600">Name</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Email</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Group</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Delete</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Update</th>
                                    <th className="py-3 px-6 text-left text-gray-600">Mark Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee: any) => (
                                    <tr
                                        key={employee.id}
                                        className={`border-t hover:bg-gray-50 transition ${employee.attendanceStatus === 'PRESENT'
                                                ? 'bg-green-200'
                                                : employee.attendanceStatus === 'ABSENT'
                                                    ? 'bg-red-200'
                                                    : employee.attendanceStatus === 'HOLIDAY'
                                                        ? 'bg-yellow-200'
                                                        : ''
                                            }`}
                                    >
                                        <td className="py-3 px-6">{employee.name}</td>
                                        <td className="py-3 px-6">{employee.email}</td>
                                        <td className="py-3 px-6">{employee.group}</td>
                                        <td className="">
                                            <button className="m-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                                onClick={() => handleDeleteEmployee(employee.id)}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button className="m-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                                onClick={() => setIsEdit(employee)} >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <AttendanceForm
                                                date={date}
                                                attendanceStatus={employee.attendanceStatus}
                                                employeeId={employee.id}
                                                setEmployees={setEmployees}
                                            />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                            onClick={() => setIsAdd(true)} >
                            Add Employee
                        </button>
                    </>
                )}
        </div>
    );
};

export default EmployeeList;
