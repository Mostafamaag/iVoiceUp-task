import { useState } from 'react';
import { addEmployee } from '../services/employeeService';

const AddEmployee = ({setIsAdd, setEmployees}: any) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const employee = await addEmployee(email, name, password);
            console.log(employee);
            //alert("Added employee successfully");
            setEmployees((prevEmployees) => {
                return [...prevEmployees, employee]
            })
            setIsAdd(false);
        } catch (error) {
            alert("Error while adding employee");
            console.error("Error saving employee:", error);
        }
    };

    const onCancel = async () => {
        setIsAdd(false);
    }

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Add Employee</h2>
            <form onSubmit={ handleSave}>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                </div>


                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white py-2 px-8 rounded-lg hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );

};

export default AddEmployee;
