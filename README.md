# Denz Student Profile Cordova

A responsive student profile app made with Cordova, HTML, CSS, and JavaScript.

## Features

* Profile, About, Skills, Projects, and Contact pages
* Edit Profile with Save and Cancel
* Form validation
* localStorage for profile data
* Camera profile picture
* Retake and cancel camera
* Camera permission and error handling
* Responsive design

## Camera

The app uses the Cordova Camera Plugin through:

```javascript
navigator.camera.getPicture()
```

Captured profile pictures are saved using localStorage and remain after restarting the app.

## Tools

* HTML
* CSS
* JavaScript
* Cordova
* Cordova Camera Plugin
* Android Studio
* GitHub

## How to Run

```bash
cordova plugin add cordova-plugin-camera
cordova platform add android
cordova run android
```

## Testing

* Edit Profile – Passed
* Save and Cancel – Passed
* Form Validation – Passed
* Page Navigation – Passed
* Camera Capture – Passed
* Retake and Cancel – Passed
* Picture Persistence – Passed
* Camera Error Handling – Passed

## Screenshots

### Student Profile

<img width="496" height="925" alt="Student Profile" src="https://github.com/user-attachments/assets/6111eaf4-90dc-4551-842e-9f1f04f53dd6" />

### Edit Profile

<img width="482" height="931" alt="Edit Profile form" src="https://github.com/user-attachments/assets/c79ed092-d86f-41d5-85fc-45ccaff3f35b" />

### Updated Profile

<img width="488" height="930" alt="Updated Profile" src="https://github.com/user-attachments/assets/ce304ea1-3314-4540-b421-86a64205a3a3" />

## Author

Denz Godwen D. Macasero
BS Information Technology
