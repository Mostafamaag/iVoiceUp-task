// src/pages/Dashboard.tsx
import { useNavigate } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Dashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl pl-4 font-bold">HR System Dashboard</h1>
      </header>
      <main className="p-8">
          <EmployeeList />
      </main>
    </div>
  );
};

export default Dashboard;
