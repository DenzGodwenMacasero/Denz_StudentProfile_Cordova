# Denz Student Profile Cordova

This is my student profile mobile application made using Cordova, HTML, CSS, JavaScript, REST API, and MySQL.

## Features

* Login using Student ID or Email
* Password authentication
* Student Profile, About, Skills, Projects, and Contact pages
* Edit Profile
* MySQL database
* REST API
* CRUD operations
* Logout
* Profile picture using the device camera
* Form validation
* Data persistence
* Responsive design

## Login and Authentication

The user needs to log in before accessing the student profile.

The login uses a Student ID or Email and Password. After logging in, the application gets the user's profile information from the database.

Passwords are stored using bcrypt hashing, and database credentials are stored in `.env`.

## Database

The project uses MySQL with the database:

```text
denz_student_profile
```

Tables:

```text
profile
student_accounts
```

The profile stores information such as Student ID, Name, Course, Year Level, About Me, Skills, Projects, and Profile Picture.

## REST API

```text
POST   /api/login
POST   /api/logout
GET    /api/profile/me
PUT    /api/profile/me
POST   /api/profile
GET    /api/profile
GET    /api/profile/:id
DELETE /api/profile/:id
```

The API is used by the Cordova application to communicate with the MySQL database.

## Camera

The application uses the Cordova Camera Plugin for the profile picture.

```javascript
navigator.camera.getPicture()
```

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

## Test Account

```text
Student ID: 20220024745
Email: macaserodenzgodwen@gmail.com
```

The password is not included in the repository.

## Testing

| Test              | Result                           |
| ----------------- | -------------------------------- |
| Valid Login       | Passed                           |
| Invalid Login     | Passed                           |
| Profile Retrieval | Passed                           |
| Edit Profile      | Passed                           |
| Database Update   | Passed                           |
| CRUD Operations   | Passed                           |
| Logout            | Passed                           |
| Data Persistence  | Passed                           |
| Camera            | Requires Cordova device/emulator |

## Screenshots

### Login and Profile

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


## Author

**Denz Godwen D. Macasero**
BS Information Technology
