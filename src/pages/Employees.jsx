import React from "react";

const Employees = () => {
  const employees = [
    {
      name: "John Doe",
      position: "Lead",
      section: "4-2",
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    {
      name: "Jane Smith",
      position: "Member",
      section: "4-2",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
    },
    {
      name: "Michael Johnson",
      position: "Lead",
      section: "4-3",
      email: "michael.johnson@example.com",
      phone: "555-555-5555",
    },
    {
      name: "Emily Davis",
      position: "Member",
      section: "4-3",
      email: "emily.davis@example.com",
      phone: "111-111-1111",
    },
    {
      name: "David Wilson",
      position: "Lead",
      section: "4-4",
      email: "david.wilson@example.com",
      phone: "222-222-2222",
    },
    {
      name: "Olivia Taylor",
      position: "Member",
      section: "4-4",
      email: "olivia.taylor@example.com",
      phone: "333-333-3333",
    },
    {
      name: "Daniel Anderson",
      position: "Lead",
      section: "4-5",
      email: "daniel.anderson@example.com",
      phone: "444-444-4444",
    },
    {
      name: "Sophia Martinez",
      position: "Member",
      section: "4-5",
      email: "sophia.martinez@example.com",
      phone: "555-555-5555",
    },
    {
      name: "Matthew Thompson",
      position: "Lead",
      section: "4-6",
      email: "matthew.thompson@example.com",
      phone: "666-666-6666",
    },
    {
      name: "Ava Garcia",
      position: "Member",
      section: "4-6",
      email: "ava.garcia@example.com",
      phone: "777-777-7777",
    },
    // Add more names and details here
    // ...
  ];

  return (
    <div className="container">
      <h1>Employees</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Section</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.section}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
