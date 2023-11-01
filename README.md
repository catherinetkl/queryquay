# Query Quay - Employee Management App
Query Quay is a powerful and flexible employee management application built to streamline your HR and workforce management needs. With a robust combination of Spring Boot, Spring Security, PostgreSQL, ReactJS, and TypeScript, Query Quay empowers your organization with a comprehensive solution for user registration, authentication, authorization, and role-based access control.

## Disclaimer
*As of the current README update, the backend deployment of the Spring Boot application and PostgreSQL on the Railway app may require attention to ensure seamless functionality. However, please note that the React Vercel app works flawlessly when the Spring Boot application is running locally on localhost:8080.

**Test User Credentials:**
To test the application, you can use the following user accounts:

- User Account:
  - Email: user@mail.com
  - Password: 1234567

- Manager Account:
  - Email: manager@mail.com
  - Password: 1234567

- Admin Account:
  - Email: admin@mail.com
  - Password: 1234567

## Features
**User Authentication & Authorization**: Query Quay implements JWT (JSON Web Token) authentication and authorization for secure user registration, login, and access to various application sections. It leverages Spring Security to ensure robust user data protection.

**Role-Based Access Control**: The application includes three distinct user roles: "User," "Manager," and "Admin." Each role has different privileges and access rights within the application. This facilitates organized user management and enhanced security.

**Multilingual Support**: Query Quay offers multilingual support, allowing users to switch between five different languages. The application utilizes React's i18n library to provide a seamless and accessible user experience.

**Day and Night Mode**: Users can toggle between day and night mode with a single click, enhancing the app's usability and visual appeal.

## Application Structure
The Query Quay application is designed with a robust and well-organized architecture:

### Backend (Spring Boot):

- **Web Security Configuration**: Manages authentication and authorization using Spring Security. It includes user registration, login, and role-based access control.
- **Authentication and Authorization**: Implements JWT-based token authentication, ensuring secure access to different application sections.
- **Database Interaction**: Communicates with a PostgreSQL database through User and Role repositories to manage user and role data.
- **Controllers**: AuthController and TestController interact with the repositories to serve requests.

### Frontend (ReactJS & TypeScript):

- **User Profiles**: Users have a profile page where they can view their name, email, and assigned role based on their account type (User, Manager, or Admin).
- **Role-Based Access**: Different users are presented with customized messages and access rights based on their assigned roles.
- **Multilingual Support**: Users can switch between five different languages for an enhanced user experience.
- **Day and Night Mode**: Offers a convenient day and night mode to enhance visual comfort.

## Future Enhancements
- **Forget and Reset Password**: Future updates will include the ability to reset or change passwords.
- **Employee Management System**: Query Quay will evolve to provide comprehensive HR management functionalities, including leave applications, attendance tracking, holiday management, performance evaluations, and skills management.

## Technical Details
The application follows the Model-View-Controller (MVC) design pattern to maintain a clear separation of concerns and ensure maintainability, scalability, and modularity. It leverages Spring Boot and ReactJS for their efficiency, robustness, and flexibility in creating a powerful employee management tool.

## Get Started
For more information and to explore Query Quay, please check out the application at [Query Quay](https://queryquay.vercel.app/).

Empower your organization's HR and workforce management with Query Quay.

If you have any questions or require further assistance, please feel free to reach out. We're here to help!
