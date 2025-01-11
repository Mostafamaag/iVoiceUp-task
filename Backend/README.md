# HR system

This is backend service for the HR system, providing APIs to handle user authentication, employee management, and attendance tracking. Built with robust validation and secure authentication, it ensures that only authorized HR employees can manage system data.

## Features
- <p align="left"><strong> Authentication & Authorization: </strong> Sign up and login. JWT-based authentication with role-based access control</p>
- <p align="left"><strong> User Roles: </strong>Employees and HRs with different access permissions.</p>
- <p align="left"><strong> CRUD Operations: </strong>Full CRUD for employees and attendace</p>
- <p align="left"><strong> Validations: </strong>Input validation for all API requests to ensure data integrity.</p>
- <p align="left"><strong> Error Handling: </strong>Comprehensive error handling with descriptive messages.</p>

## Technologies Used
- <p align="left"><strong> Backend: </strong>NestJS, NodeJS</p>
- <p align="left"><strong> Database: </strong>PostgreSQL, TypeORM</p>
- <p align="left"><strong>Authentication: </strong>JSON Web Tokens (JWT), Passport Strategy.</p>

## Run
  To run this project locally, follow these steps:
  
    git clone https://github.com/iVoiceUp-task
    cd iVoiceUp-task/backend
    npm install
    npm run start

  Create or edit a .env file in the root directory and add the following:

    DB_PORT = 
    DB_HOST = 
    DB_DATABASE= 
    DB_USERNAME =
    DB_PASSWORD = 
    JWT_SECRET = 

