# Book Rental Management System

This project is a web application for managing a book rental service. The system allows admins to manage books, owners, and notifications, while users can register, log in, and browse available books for rental.

## Features

- **User Registration & Authentication**: 
  - Secure user registration with role-based access control.
  - JWT-based authentication for secure login.
  
- **Admin Dashboard**: 
  - Manage books, owners, and notifications from an intuitive dashboard.
  - View and manage users based on roles (Admin, Owner).
  
- **Book Management**:
  - Add, edit, and delete books.
  - Assign books to owners for renting.

- **Owner Management**:
  - Manage book owners, including adding, editing, and removing owners.
  
- **Notifications**:
  - Admins can recieve to authenticate book adding

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express, Sequelize (with Postgresql)
- **Authentication**: JWT, bcrypt
- **Routing**: React Router, Express

## Installation


```bash
├── client                
│   ├── src
│   │   ├── components     
│   │   ├── pages
│   │   │   ├── admin     
│   │   │   └── auth       
│   └── public
├── server                 
│   ├── models             
│   ├── routes           
│   ├── controllers        
│   ├── middleware        
│   └── config             

```
## Installation
```bash
    git clone https://github.com/DanielZerihunGeda/book-rental.git
    cd book-rental
```
- **setup environment variable (.env) in server dir.**:
 ```bash 
    DB_HOST=
    DB_PORT
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    JWT_SECRET=
    DB_DIALECT=
    PORT=5000
```
- **compose docker**: `docker-compose up -build` or `cd server, node server.js` && `cd client npm start`

## License

## Contact