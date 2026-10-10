# Denz Student Profile Cordova

<<<<<<< Updated upstream
This is my student profile mobile application made using Cordova, HTML, CSS, JavaScript, REST API, and MySQL.
=======
A responsive student profile mobile application built using Apache Cordova, HTML, CSS, JavaScript, Node.js, Express, REST API, and MySQL for ITCC 41 – Mobile Applications Development.
>>>>>>> Stashed changes

## Features

* Login using Student ID or email
* Password authentication
<<<<<<< Updated upstream
* Student Profile, About, Skills, Projects, and Contact pages
* Edit Profile
* MySQL database
* REST API
* CRUD operations
* Logout
* Profile picture using the cordova app camera
=======
* Student profile viewing and editing
* About, Skills, Projects, and Contact pages
* Profile creation, listing, and deletion through the REST API
* MySQL database integration
* Camera support for profile pictures
>>>>>>> Stashed changes
* Form validation
* Data persistence
* Responsive mobile interface
* Logout functionality

## How to Run the Project

Follow these instructions to set up and run the project on a Windows computer.

### 1. Install the Required Software

Install the following software:

* **Node.js and npm:** https://nodejs.org/
* **MySQL Server and Workbench:** https://dev.mysql.com/downloads/installer/
* **Git:** https://git-scm.com/downloads
* **Android Studio:** https://developer.android.com/studio

Android Studio is required for setting up an Android emulator and SDK.

After installing Node.js, open Command Prompt and verify the installation:

```cmd
node --version
npm --version
```

### 2. Clone the GitHub Repository

Open Command Prompt and navigate to the directory where you want to save the project.

Clone the repository:

```cmd
git clone https://github.com/DenzGodwenMacasero/Denz_StudentProfile_Cordova.git
```

Enter the project folder:

```cmd
cd Denz_StudentProfile_Cordova
```

### 3. Set Up the MySQL Database

1. Open MySQL Workbench.

2. Connect to the local MySQL Server.

3. Create the database:

   ```sql
   CREATE DATABASE IF NOT EXISTS denz_student_profile;
   ```

4. Select the database:

   ```sql
   USE denz_student_profile;
   ```

5. Create or import the required tables:

   * `profile`
   * `student_accounts`

6. Ensure that both tables have the correct columns, data types, primary keys, and relationships expected by the backend.

7. Ensure that the student account data and profile relationships are correctly configured.

**Important:** The repository does not currently include a complete SQL script for recreating the database tables. Creating the database alone is not enough. The correct table definitions and student account data must be available before the application can run successfully.

### 4. Configure the Backend

Open Command Prompt in the project directory and navigate to the backend folder:

```cmd
cd backend
```

Install the required Node.js packages:

```cmd
npm install
```

Create a file named `.env` inside the `backend` folder. Add the following configuration:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=denz_student_profile
```

Replace `your_mysql_username` and `your_mysql_password` with the credentials for the local MySQL installation.

If the `.env` file already exists and is configured correctly, keep the existing file.

**Security:** Never upload actual database passwords or other private credentials to GitHub. The `.env` file should remain excluded from version control.

### 5. Start the Backend Server

Make sure MySQL Server is running.

From the `backend` directory, run:

```cmd
npm start
```

When the configuration is correct, the terminal should display messages similar to:

```text
MySQL database connected successfully.
REST API server running on http://localhost:3000
```

Keep this Command Prompt window open while using the application.

To verify that the API server is running, open the following address in a browser on the same computer:

http://localhost:3000/

The root endpoint should respond that the REST API is running.

If the server cannot connect to MySQL, check the database name, credentials, table structure, `.env` file location, and MySQL service status.

### 6. Set Up Cordova and Android

Open a **second Command Prompt** in the project's root directory. Do not run these commands inside the `backend` folder.

Check whether Cordova is installed:

```cmd
cordova --version
```

If Cordova is not installed, run:

```cmd
npm install -g cordova
```

If the Android platform has not been added to the project, run:

```cmd
cordova platform add android
```

If it is already configured, you do not need to add it again.

Open Android Studio and configure the Android SDK and an Android emulator. Start the emulator before launching the application.

### 7. Configure the Mobile App's API Connection

The current frontend JavaScript files use:

```text
http://localhost:3000
```

The correct address depends on where the application is running.

* **Browser on the same computer:** `http://localhost:3000`
* **Standard Android Studio emulator:** `http://10.0.2.2:3000`
* **Physical Android device:** Use the computer's reachable local network IP address, with both devices connected to an appropriate network.

In the standard Android Studio emulator, `10.0.2.2` provides access to the host computer's loopback interface.

The current frontend uses `localhost`, so Android emulator or physical-device testing may require the API address to be configured for that environment. Ensure that the app can reach the backend before testing login and profile operations.

### 8. Run the Mobile Application

With MySQL and the backend running, return to the second Command Prompt at the project root.

Run:

```cmd
cordova run android
```

Cordova will build the application and attempt to launch it on the connected Android device or running emulator.

If the command fails, check the Android SDK, Java requirements, emulator configuration, and Cordova platform installation.

### 9. Test the Application

Once the application launches, test the following:

1. Log in using a valid student account configured in the database.
2. Confirm that the student profile loads.
3. Edit the profile and check that the changes are saved.
4. Test the other available profile features.
5. Confirm that database changes persist.
6. Log out and confirm that the session ends.
7. Test the camera feature on a supported device or emulator.

The project requires a correctly configured database, valid student account data, a running backend, and a working API connection.

## Login and Authentication

<<<<<<< Updated upstream
The user needs to log in before accessing the student profile.

The login uses a Student ID or Email and Password. After logging in, the application gets the user's profile information from the database.

Passwords are stored using bcrypt hashing, and database credentials are stored in `.env`.

## Database

The project uses MySQL with the database:
=======
Users must log in before accessing protected student profile features.

The backend uses session tokens for authentication. Logout invalidates the current session and returns the user to the login page.

Passwords are handled using bcrypt hashing.

Protected API endpoints require a valid authentication token.

## Database

Database name:
>>>>>>> Stashed changes

```text
denz_student_profile
```

Required tables:

```text
profile
student_accounts
```

<<<<<<< Updated upstream
The profile stores information such as Student ID, Name, Course, Year Level, About Me, Skills, Projects, and Profile Picture.
=======
The `profile` table stores student profile information, including fields such as Student ID, name, email, age, course, year level, bio, skills, projects, and profile picture.
>>>>>>> Stashed changes

The `student_accounts` table stores student account information used by the login system and links accounts to profiles.

The actual table structure must match the SQL queries in `backend/server.js`.

<<<<<<< Updated upstream
The API is used by the Cordova application to communicate with the MySQL database.

## Camera

The application uses the Cordova Camera Plugin for the profile picture.
=======
## REST API Endpoints

| Method | Endpoint           | Purpose                                  |
| ------ | ------------------ | ---------------------------------------- |
| POST   | `/api/login`       | Authenticate a student                   |
| POST   | `/api/logout`      | End the current session                  |
| GET    | `/api/profile/me`  | Retrieve the logged-in student's profile |
| PUT    | `/api/profile/me`  | Update the logged-in student's profile   |
| POST   | `/api/profile`     | Create a profile                         |
| GET    | `/api/profile`     | Retrieve the profile list                |
| GET    | `/api/profile/:id` | Retrieve a profile by ID                 |
| DELETE | `/api/profile/:id` | Delete a profile by ID                   |
>>>>>>> Stashed changes

Protected endpoints require authentication. Requests must follow the backend's expected request format.

<<<<<<< Updated upstream
The camera works when the application is running on a supported Cordova device or emulator. Browser testing does not provide the native Cordova camera.

## How to Run

Start MySQL, then run the backend:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:3000
```

For browser testing:

```bash
cd www
npx.cmd serve
```

For a Cordova Android build:

```bash
cordova platform add android
cordova run android
```
=======
## Camera Feature

The application uses the Cordova Camera Plugin for profile picture capture.

The native camera requires a compatible device or emulator, the necessary plugin configuration, and appropriate permissions. Testing in a regular browser does not necessarily demonstrate that the native camera works.

## Security

* Database credentials are stored in a local `.env` file.
* Passwords should be stored using secure hashing.
* Protected profile operations require authentication.
* The mobile application communicates with the backend rather than connecting directly to MySQL.
>>>>>>> Stashed changes

## Test Account

Use a valid student account that exists in the configured database.

Student ID:

```text
20220024745
```

<<<<<<< Updated upstream
The password is not included in the repository.

=======
Email:

```text
macaserodenzgodwen@gmail.com
```

The password is not included in this public repository. The account must exist in the local database, and its credentials must match the backend's authentication requirements.

## Testing Checklist

Use this checklist when testing the application:

* [ ] MySQL Server starts successfully.
* [ ] The database and required tables are configured.
* [ ] The backend connects to MySQL.
* [ ] The REST API responds successfully.
* [ ] Valid login works.
* [ ] Invalid login is rejected.
* [ ] The student profile loads.
* [ ] Profile editing updates the database.
* [ ] Profile creation, listing, and deletion work as expected.
* [ ] Logout ends the session.
* [ ] Data persists after restarting the application.
* [ ] The camera works on a compatible device or emulator.

Record test results only after performing the corresponding tests.
>>>>>>> Stashed changes

## Screenshots

### Login and Profile

<<<<<<< Updated upstream
<img width="1556" height="968" alt="Login page" src="https://github.com/user-attachments/assets/14f0a40d-6d80-4558-8fe6-a4654bc77885" />


### Invalid Login

<img width="1238" height="807" alt="Login Invalid" src="https://github.com/user-attachments/assets/e365b69c-554e-4238-a34f-43a5ebddf7ae" />


### Edit Profile

<img width="1820" height="968" alt="Screenshot 2026-09-27 193746" src="https://github.com/user-attachments/assets/293d6f44-d83d-44a3-985c-406454167b0e" />


### CRUD Testing

<img width="1478" height="316" alt="GET  Read" src="https://github.com/user-attachments/assets/9b1381f6-920e-443b-9487-875129eb0a23" />
<img width="1486" height="297" alt="POST  Create" src="https://github.com/user-attachments/assets/abdf0e4f-10ff-41a8-bb15-867809d543b2" />
<img width="1476" height="452" alt="PUT  Update" src="https://github.com/user-attachments/assets/96f6dbfd-8a74-4fc3-9995-0309003105e7" />
<img width="1482" height="301" alt="DELETE" src="https://github.com/user-attachments/assets/5287c673-4d52-4c61-9b73-c283764c291b" />

=======
Add screenshots showing the login page and student profile.

### Invalid Login

Add a screenshot showing the application's response to invalid login credentials.

### Edit Profile

Add a screenshot showing profile editing.

### MySQL Update

### CRUD Testing

Add screenshots showing the results of create, read, update, and delete operations.
>>>>>>> Stashed changes

## Author

**Denz Godwen D. Macasero**
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
BS Information Technology

Xavier University – Ateneo de Cagayan
