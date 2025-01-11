// src/components/AttendanceForm.tsx
import React, { useEffect, useState } from "react";
import { recordAttendance } from "../services/attendanceService"

const AttendanceForm = ({ date, employeeId, setEmployees, attendanceStatus }: any) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attendanceStatus !== 'NO_STATUS') {
      alert("Attendance already recorded");
      return;
    }

    const data = await saveAttendance();
    console.log(data);
    //alert("Attendance recorded successfully.");

    setEmployees((prevEmployees) => {
      return prevEmployees.map((emp) =>
        employeeId === emp.id ?
          { ...emp, attendanceStatus: status }
          :
          emp
      )
    })

  };

  const saveAttendance = async () => {
    try {
      const data: any = await recordAttendance(employeeId, date, status);
      return data;
    } catch (err) {
      alert("Error while recording attendance, Try again");
      console.log("error", err);
    }
  }

  useEffect(() => {
    //setStatus(attendanceStatus);
  }, [date])

  return (
    <div className="p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded-lg shadow-lg max-w-md mx-auto flex flex-col items-center"
      >
        <div className="flex items-center justify-center">
          <select
            value={attendanceStatus === "NO_STATUS" ? status : attendanceStatus}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="PRESENT">PRESENT</option>
            <option value="ABSENT">ABSENT</option>
            <option value="HOLIDAY">HOLIDAY</option>
          </select>
          <button
            type="submit"
            onClick={() => console.log("Button beside dropdown clicked!")}
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Mark Attendance
          </button>
        </div>
      </form>
    </div>

  );
};

export default AttendanceForm;
