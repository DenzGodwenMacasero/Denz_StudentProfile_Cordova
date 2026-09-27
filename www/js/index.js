function onDeviceReady() {
    console.log(
        'Running cordova-' +
        cordova.platformId +
        '@' +
        cordova.version
    );
}

const API_URL = 'http://localhost:3000/api/profile';

const defaultProfile = {
    id: null,
    fullName: 'Denz Godwen D. Macasero',
    email: 'macaserodenzgodwen@gmail.com',
    age: 20,
    course: 'BS Information Technology',
    yearLevel: '3rd Year',
    aboutMe: 'I am Denz Godwen D. Macasero, a BSIT student at Xavier University – Ateneo de Cagayan. I am interested in technology, web development, and creating applications that are simple and comfortable for people to use. I also enjoy gaming and exploring new ideas that help me improve my technical and creative skills.',
    skills: 'HTML, CSS, JavaScript, Python, Java, Figma & UI/UX',
    projects: 'Dorm Laundry Queue Management System',
    profileImage: 'img/profile.jpg'
};

let currentProfile = null;

document.addEventListener('deviceready', onDeviceReady, false);

document.addEventListener('DOMContentLoaded', function () {
    loadProfile();

    const editButton =
        document.getElementById('edit-profile-btn');

    if (editButton) {
        editButton.addEventListener(
            'click',
            openEditForm
        );
    }

    const cancelButton =
        document.getElementById('cancel-profile-btn');

    if (cancelButton) {
        cancelButton.addEventListener(
            'click',
            cancelEdit
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

async function loadProfile() {
    try {
        const response =
            await fetch(API_URL);

        if (!response.ok) {
            throw new Error(
                'API request failed'
            );
        }

        const profiles =
            await response.json();

        if (profiles.length > 0) {
            const profile =
                apiToLocalProfile(
                    profiles[0]
                );

            currentProfile = profile;

            localStorage.setItem(
                'studentProfile',
                JSON.stringify(profile)
            );

            displayProfile(profile);
            return;
        }

        const savedProfile =
            localStorage.getItem(
                'studentProfile'
            );

        if (savedProfile) {
            try {
                const profile =
                    JSON.parse(savedProfile);

                currentProfile = profile;
                displayProfile(profile);

            } catch (error) {
                currentProfile =
                    Object.assign(
                        {},
                        defaultProfile
                    );

                displayProfile(
                    currentProfile
                );
            }
        } else {
            currentProfile =
                Object.assign(
                    {},
                    defaultProfile
                );

            displayProfile(
                currentProfile
            );
        }

    } catch (error) {
        console.error(
            'Error loading profile from API:',
            error
        );

        const savedProfile =
            localStorage.getItem(
                'studentProfile'
            );

        if (savedProfile) {
            try {
                const profile =
                    JSON.parse(savedProfile);

                currentProfile = profile;
                displayProfile(profile);

            } catch (parseError) {
                currentProfile =
                    Object.assign(
                        {},
                        defaultProfile
                    );

                displayProfile(
                    currentProfile
                );
            }
        } else {
            currentProfile =
                Object.assign(
                    {},
                    defaultProfile
                );

            displayProfile(
                currentProfile
            );
        }
    }
}

function apiToLocalProfile(profile) {
    return {
        id: profile.id,
        fullName: profile.name || '',
        email: profile.email || '',
        age: profile.age || 20,
        course: profile.course || '',
        yearLevel: profile.year_level || '',
        aboutMe: profile.bio || '',
        skills: profile.skills || '',
        projects:
            profile.projects ||
            'Dorm Laundry Queue Management System',
        profileImage:
            profile.profile_image ||
            'img/profile.jpg'
    };
}

function localToApiProfile(profile) {
    return {
        name: profile.fullName,
        email: profile.email,
        age: profile.age,
        course: profile.course,
        year_level: profile.yearLevel,
        bio: profile.aboutMe,
        skills: profile.skills,
        projects: profile.projects,
        profile_image: profile.profileImage || ''
    };
}

function displayProfile(profile) {
    const fullName =
        profile.fullName;

    const course =
        profile.course;

    const yearLevel =
        profile.yearLevel;

    const aboutMe =
        profile.aboutMe;

    const skills =
        profile.skills;

    const headerName =
        document.getElementById(
            'header-name'
        );

    if (headerName) {
        headerName.textContent =
            fullName;
    }

    const displayName =
        document.getElementById(
            'display-name'
        );

    if (displayName) {
        displayName.textContent =
            fullName;
    }

    const displayCourse =
        document.getElementById(
            'display-course'
        );

    if (displayCourse) {
        displayCourse.textContent =
            course;
    }

    const displayYear =
        document.getElementById(
            'display-year'
        );

    if (displayYear) {
        displayYear.textContent =
            yearLevel;
    }

    const footerName =
        document.getElementById(
            'footer-name'
        );

    if (footerName) {
        footerName.textContent =
            fullName;
    }

    const aboutDisplay =
        document.getElementById(
            'about-display'
        );

    if (aboutDisplay) {
        aboutDisplay.textContent =
            aboutMe;
    }

    const profileAbout =
        document.getElementById(
            'profile-about'
        );

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

    const skillList =
        String(skills || '')
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
    const profile =
        currentProfile ||
        defaultProfile;

    document.getElementById(
        'full-name'
    ).value =
        profile.fullName || '';

    document.getElementById(
        'course'
    ).value =
        profile.course || '';

    document.getElementById(
        'year-level'
    ).value =
        profile.yearLevel || '';

    document.getElementById(
        'about-me'
    ).value =
        profile.aboutMe || '';

    document.getElementById(
        'skills'
    ).value =
        profile.skills || '';

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

async function saveProfile() {
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

    const oldProfile =
        currentProfile ||
        defaultProfile;

    const updatedProfile = {
        id: oldProfile.id || null,
        fullName: fullName,
        email:
            oldProfile.email ||
            'macaserodenzgodwen@gmail.com',
        age:
            oldProfile.age ||
            20,
        course: course,
        yearLevel: yearLevel,
        aboutMe: aboutMe,
        skills: skills,
        projects:
            oldProfile.projects ||
            'Dorm Laundry Queue Management System',
        profileImage:
            oldProfile.profileImage ||
            'img/profile.jpg'
    };

    const apiData =
        localToApiProfile(
            updatedProfile
        );

    try {
        let response;

        if (updatedProfile.id) {
            response =
                await fetch(
                    API_URL +
                    '/' +
                    updatedProfile.id,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body:
                            JSON.stringify(
                                apiData
                            )
                    }
                );
        } else {
            response =
                await fetch(
                    API_URL,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body:
                            JSON.stringify(
                                apiData
                            )
                    }
                );
        }

        if (!response.ok) {
            throw new Error(
                'Profile could not be saved.'
            );
        }

        const result =
            await response.json();

        if (!updatedProfile.id &&
            result.id) {
            updatedProfile.id =
                result.id;
        }

        currentProfile =
            updatedProfile;

        localStorage.setItem(
            'studentProfile',
            JSON.stringify(
                updatedProfile
            )
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

        showMessage(
            'Profile saved successfully.',
            false
        );

    } catch (error) {
        console.error(
            'Error saving profile:',
            error
        );

        localStorage.setItem(
            'studentProfile',
            JSON.stringify(
                updatedProfile
            )
        );

        currentProfile =
            updatedProfile;

        displayProfile(
            updatedProfile
        );

        showMessage(
            'API unavailable. Profile saved locally.'
        );
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

async function saveCameraImage(imageData) {
    let imageSource =
        imageData;

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

    const profile =
        Object.assign(
            {},
            currentProfile ||
            defaultProfile
        );

    profile.profileImage =
        imageSource;

    try {
        const apiData =
            localToApiProfile(
                profile
            );

        if (profile.id) {
            const response =
                await fetch(
                    API_URL +
                    '/' +
                    profile.id,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body:
                            JSON.stringify(
                                apiData
                            )
                    }
                );

            if (!response.ok) {
                throw new Error(
                    'Profile picture API update failed.'
                );
            }
        }

        currentProfile =
            profile;

        localStorage.setItem(
            'studentProfile',
            JSON.stringify(
                profile
            )
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

        localStorage.setItem(
            'studentProfile',
            JSON.stringify(
                profile
            )
        );

        currentProfile =
            profile;

        displayProfile(
            profile
        );

        showCameraMessage(
            'API unavailable. Profile picture saved locally.'
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