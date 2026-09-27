# Denz Student Profile Cordova

A responsive student profile mobile application built with Cordova, HTML, CSS, JavaScript, REST API, and MySQL.

## Features

* Login using Student ID or Email
* Password authentication
* Profile, About, Skills, Projects, and Contact pages
* Edit Profile
* MySQL database
* REST API
* CRUD operations
* Logout
* Camera profile picture
* Form validation
* Data persistence
* Responsive design

## Authentication

Users must log in before accessing the student profile.

The backend uses session tokens for authentication. Logout invalidates the session and returns the user to the Login page.

Passwords are stored using bcrypt hashing.

## Database

Database:

```text
denz_student_profile
```

Tables:

```text
profile
student_accounts
```

Profile data includes Student ID, Name, Course, Year Level, About Me, Skills, Projects, and Profile Picture.

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

## Camera

The app uses the Cordova Camera Plugin.

```javascript
navigator.camera.getPicture()
```

The native camera requires running the Cordova application on a supported device or emulator.

## Security

* Database credentials are stored in `.env`.
* `.env` is excluded from GitHub.
* Passwords are hashed using bcrypt.
* Protected API endpoints require authentication.
* The app does not connect directly to MySQL.

## How to Run

Start MySQL, then run the backend:

```bash
cd backend
npm install
npm start
```

Backend:

```text
http://localhost:3000
```

For browser testing:

```bash
cd www
npx.cmd serve
```

For Cordova:

```bash
cordova platform add android
cordova run android
```

## Test Account

```text
Student ID: 20220024745
Email: macaserodenzgodwen@gmail.com
```

Password is not included in the public repository.

## Testing

| Test              | Result                           |
| ----------------- | -------------------------------- |
| Valid Login       | Passed                           |
| Invalid Login     | Passed                           |
| Profile Retrieval | Passed                           |
| Edit Profile      | Passed                           |
| Database Update   | Passed                           |
| Logout            | Passed                           |
| Data Persistence  | Passed                           |
| Camera            | Requires Cordova device/emulator |

## Screenshots

### Login and Profile


### Invalid Login


### Edit Profile


### MySQL Update

![MySQL Update](screenshots/activity-7/database-update.png)

### CRUD Testing




## Author

Denz Godwen D. Macasero
BS Information Technology
