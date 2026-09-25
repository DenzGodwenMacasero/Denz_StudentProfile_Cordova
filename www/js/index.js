function onDeviceReady() {
    console.log(
        'Running cordova-' +
        cordova.platformId +
        '@' +
        cordova.version
    );
}

const defaultProfile = {
    fullName: 'Denz Godwen D. Macasero',
    course: 'BS Information Technology',
    yearLevel: '3rd Year',
    aboutMe: 'I am Denz Godwen D. Macasero, a BSIT student at Xavier University – Ateneo de Cagayan. I am interested in technology, web development, and creating applications that are simple and comfortable for people to use. I also enjoy gaming and exploring new ideas that help me improve my technical and creative skills.',
    skills: 'HTML, CSS, JavaScript, Python, Java, Figma & UI/UX',
    profileImage: 'img/profile.jpg'
};

document.addEventListener('deviceready', onDeviceReady, false);

document.addEventListener('DOMContentLoaded', function () {
    loadProfile();

    const editButton =
        document.getElementById('edit-profile-btn');

    if (editButton) {
        editButton.addEventListener(
            'click',
            function () {
                openEditForm();
            }
        );
    }

    const cancelButton =
        document.getElementById('cancel-profile-btn');

    if (cancelButton) {
        cancelButton.addEventListener(
            'click',
            function () {
                cancelEdit();
            }
        );
    }

    const profileForm =
        document.getElementById('profile-form');

    if (profileForm) {
        profileForm.addEventListener(
            'submit',
            function (event) {
                event.preventDefault();
                saveProfile();
            }
        );
    }

    const profilePictureButton =
        document.getElementById('profile-picture-btn');

    if (profilePictureButton) {
        profilePictureButton.addEventListener(
            'click',
            openCamera
        );
    }

    const changeProfilePictureButton =
        document.getElementById(
            'change-profile-picture-btn'
        );

    if (changeProfilePictureButton) {
        changeProfilePictureButton.addEventListener(
            'click',
            openCamera
        );
    }
});

function loadProfile() {
    const savedProfile =
        localStorage.getItem('studentProfile');

    if (savedProfile) {
        try {
            const profile =
                JSON.parse(savedProfile);

            displayProfile(profile);

        } catch (error) {
            console.error(
                'Error reading saved profile:',
                error
            );

            displayProfile(defaultProfile);
        }

    } else {
        displayProfile(defaultProfile);
    }
}

function displayProfile(profile) {
    const fullName = profile.fullName;
    const course = profile.course;
    const yearLevel = profile.yearLevel;
    const aboutMe = profile.aboutMe;
    const skills = profile.skills;

    const headerName =
        document.getElementById('header-name');

    if (headerName) {
        headerName.textContent = fullName;
    }

    const displayName =
        document.getElementById('display-name');

    if (displayName) {
        displayName.textContent = fullName;
    }

    const displayCourse =
        document.getElementById('display-course');

    if (displayCourse) {
        displayCourse.textContent = course;
    }

    const displayYear =
        document.getElementById('display-year');

    if (displayYear) {
        displayYear.textContent = yearLevel;
    }

    const footerName =
        document.getElementById('footer-name');

    if (footerName) {
        footerName.textContent = fullName;
    }

    const aboutDisplay =
        document.getElementById('about-display');

    if (aboutDisplay) {
        aboutDisplay.textContent = aboutMe;
    }

    const profileAbout =
        document.getElementById('profile-about');

    if (profileAbout) {
        profileAbout.textContent =
            'A ' +
            course +
            ' student who enjoys building useful, clean, and user-friendly digital experiences.';
    }

    const shortName =
        fullName.split(' ')[0];

    const profileShortName =
        document.getElementById(
            'profile-short-name'
        );

    if (profileShortName) {
        profileShortName.textContent =
            shortName + '.';
    }

    displaySkills(skills);

    displayProfilePicture(
        profile.profileImage
    );
}

function displayProfilePicture(profileImage) {
    const profilePicture =
        document.getElementById(
            'profile-picture'
        );

    if (!profilePicture) {
        return;
    }

    if (profileImage) {
        profilePicture.src =
            profileImage;
    } else {
        profilePicture.src =
            'img/profile.jpg';
    }
}

function displaySkills(skills) {
    const skillsContainer =
        document.getElementById(
            'skills-display'
        );

    if (!skillsContainer) {
        return;
    }

    const skillList = skills
        .split(',')
        .map(function (skill) {
            return skill.trim();
        })
        .filter(function (skill) {
            return skill !== '';
        });

    skillsContainer.innerHTML = '';

    skillList.forEach(
        function (skill, index) {
            const article =
                document.createElement(
                    'article'
                );

            article.className =
                'skill-card';

            const number =
                String(index + 1)
                    .padStart(2, '0');

            article.innerHTML =
                '<span class="skill-number">' +
                number +
                '</span>' +
                '<h3>' +
                escapeHTML(skill) +
                '</h3>' +
                '<p>Skill included in my current student profile.</p>';

            skillsContainer.appendChild(
                article
            );
        }
    );
}

function openEditForm() {
    const savedProfile =
        localStorage.getItem(
            'studentProfile'
        );

    let profile;

    if (savedProfile) {
        try {
            profile =
                JSON.parse(savedProfile);
        } catch (error) {
            profile =
                defaultProfile;
        }
    } else {
        profile =
            defaultProfile;
    }

    document.getElementById(
        'full-name'
    ).value = profile.fullName;

    document.getElementById(
        'course'
    ).value = profile.course;

    document.getElementById(
        'year-level'
    ).value = profile.yearLevel;

    document.getElementById(
        'about-me'
    ).value = profile.aboutMe;

    document.getElementById(
        'skills'
    ).value = profile.skills;

    const message =
        document.getElementById(
            'form-message'
        );

    if (message) {
        message.textContent = '';
        message.className =
            'form-message';
    }

    const editSection =
        document.getElementById(
            'edit-profile-section'
        );

    if (editSection) {
        editSection.style.display =
            'block';

        editSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function saveProfile() {
    const fullName =
        document.getElementById(
            'full-name'
        ).value.trim();

    const course =
        document.getElementById(
            'course'
        ).value.trim();

    const yearLevel =
        document.getElementById(
            'year-level'
        ).value.trim();

    const aboutMe =
        document.getElementById(
            'about-me'
        ).value.trim();

    const skills =
        document.getElementById(
            'skills'
        ).value.trim();

    if (fullName === '') {
        showMessage(
            'Please enter your full name.'
        );
        return;
    }

    if (course === '') {
        showMessage(
            'Please enter your course.'
        );
        return;
    }

    if (yearLevel === '') {
        showMessage(
            'Please enter your year level.'
        );
        return;
    }

    if (aboutMe === '') {
        showMessage(
            'Please enter your about me information.'
        );
        return;
    }

    if (skills === '') {
        showMessage(
            'Please enter at least one skill.'
        );
        return;
    }

    const savedProfile =
        localStorage.getItem(
            'studentProfile'
        );

    let oldProfile = {};

    if (savedProfile) {
        try {
            oldProfile =
                JSON.parse(savedProfile);
        } catch (error) {
            oldProfile = {};
        }
    }

    const updatedProfile = {
        fullName: fullName,
        course: course,
        yearLevel: yearLevel,
        aboutMe: aboutMe,
        skills: skills,
        profileImage:
            oldProfile.profileImage ||
            'img/profile.jpg'
    };

    localStorage.setItem(
        'studentProfile',
        JSON.stringify(updatedProfile)
    );

    displayProfile(
        updatedProfile
    );

    const editSection =
        document.getElementById(
            'edit-profile-section'
        );

    if (editSection) {
        editSection.style.display =
            'none';
    }
}

function cancelEdit() {
    const editSection =
        document.getElementById(
            'edit-profile-section'
        );

    if (editSection) {
        editSection.style.display =
            'none';
    }

    const message =
        document.getElementById(
            'form-message'
        );

    if (message) {
        message.textContent = '';
        message.className =
            'form-message';
    }
}

function openCamera() {
    const cameraMessage =
        document.getElementById(
            'camera-message'
        );

    if (cameraMessage) {
        cameraMessage.textContent = '';
        cameraMessage.className =
            'form-message';
    }

    if (
        typeof navigator === 'undefined' ||
        !navigator.camera
    ) {
        showCameraMessage(
            'Camera is only available when running the Cordova app on a device.'
        );
        return;
    }

    const options = {
        quality: 70,
        destinationType:
            Camera.DestinationType.DATA_URL,
        sourceType:
            Camera.PictureSourceType.CAMERA,
        encodingType:
            Camera.EncodingType.JPEG,
        mediaType:
            Camera.MediaType.PICTURE,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        allowEdit: false
    };

    navigator.camera.getPicture(
        function (imageData) {
            saveCameraImage(
                imageData
            );
        },
        function (error) {
            handleCameraError(
                error
            );
        },
        options
    );
}

function saveCameraImage(imageData) {
    let imageSource = imageData;

    if (!imageSource) {
        showCameraMessage(
            'The camera did not return an image.'
        );
        return;
    }

    if (
        !imageSource.startsWith(
            'data:image/'
        )
    ) {
        imageSource =
            'data:image/jpeg;base64,' +
            imageSource;
    }

    const savedProfile =
        localStorage.getItem(
            'studentProfile'
        );

    let profile;

    if (savedProfile) {
        try {
            profile =
                JSON.parse(savedProfile);
        } catch (error) {
            profile =
                Object.assign(
                    {},
                    defaultProfile
                );
        }
    } else {
        profile =
            Object.assign(
                {},
                defaultProfile
            );
    }

    profile.profileImage =
        imageSource;

    try {
        localStorage.setItem(
            'studentProfile',
            JSON.stringify(profile)
        );

        displayProfile(
            profile
        );

        showCameraMessage(
            'Profile picture updated successfully.',
            true
        );

        const changeButton =
            document.getElementById(
                'change-profile-picture-btn'
            );

        if (changeButton) {
            changeButton.textContent =
                'Retake Photo';
        }

    } catch (error) {
        console.error(
            'Error saving profile picture:',
            error
        );

        showCameraMessage(
            'The photo could not be saved. Please try again.'
        );
    }
}

function handleCameraError(error) {
    console.error(
        'Camera error:',
        error
    );

    const errorText =
        String(error || '')
            .toLowerCase();

    if (
        errorText.includes('cancel') ||
        errorText.includes('no image')
    ) {
        showCameraMessage(
            'Camera cancelled. Your existing profile picture was kept.'
        );
        return;
    }

    showCameraMessage(
        'Unable to access the camera. Please allow camera permission and try again.'
    );
}

function showCameraMessage(
    message,
    isSuccess = false
) {
    const messageElement =
        document.getElementById(
            'camera-message'
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    if (isSuccess) {
        messageElement.className =
            'form-message';
    } else {
        messageElement.className =
            'form-message error';
    }
}

function showMessage(
    message,
    isError = true
) {
    const messageElement =
        document.getElementById(
            'form-message'
        );

    if (!messageElement) {
        return;
    }

    messageElement.textContent =
        message;

    if (isError) {
        messageElement.className =
            'form-message error';
    } else {
        messageElement.className =
            'form-message';
    }
}

function escapeHTML(text) {
    const div =
        document.createElement('div');

    div.textContent =
        text;

    return div.innerHTML;
}