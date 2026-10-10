# Denz Student Profile Cordova

A responsive student profile mobile application built using Apache Cordova, HTML, CSS, JavaScript, Node.js, Express, REST API, and MySQL for ITCC 41 – Mobile Applications Development.

## Features

* Login using Student ID or email
* Password authentication
* Student profile viewing and editing
* About, Skills, Projects, and Contact pages
* Profile creation, listing, and deletion through the REST API
* MySQL database integration
* Camera support for profile pictures
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

## Authentication

Users must log in before accessing protected student profile features.

The backend uses session tokens for authentication. Logout invalidates the current session and returns the user to the login page.

Passwords are handled using bcrypt hashing.

Protected API endpoints require a valid authentication token.

## Database

Database name:

```text
denz_student_profile
```

Required tables:

```text
profile
student_accounts
```

The `profile` table stores student profile information, including fields such as Student ID, name, email, age, course, year level, bio, skills, projects, and profile picture.

The `student_accounts` table stores student account information used by the login system and links accounts to profiles.

The actual table structure must match the SQL queries in `backend/server.js`.

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

Protected endpoints require authentication. Requests must follow the backend's expected request format.

## Camera Feature

The application uses the Cordova Camera Plugin for profile picture capture.

The native camera requires a compatible device or emulator, the necessary plugin configuration, and appropriate permissions. Testing in a regular browser does not necessarily demonstrate that the native camera works.

## Security

* Database credentials are stored in a local `.env` file.
* Passwords should be stored using secure hashing.
* Protected profile operations require authentication.
* The mobile application communicates with the backend rather than connecting directly to MySQL.

## Test Account

Use a valid student account that exists in the configured database.

Student ID:

```text
20220024745
```

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

## Screenshots

### Login and Profile

Add screenshots showing the login page and student profile.

### Invalid Login

Add a screenshot showing the application's response to invalid login credentials.

### Edit Profile

Add a screenshot showing profile editing.

### MySQL Update

### CRUD Testing

Add screenshots showing the results of create, read, update, and delete operations.

## Author

**Denz Godwen D. Macasero**

BS Information Technology

Xavier University – Ateneo de Cagayan
