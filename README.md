# Denz Student Profile — Activity 3

Responsive Student Profile application built with **HTML and CSS** in Apache Cordova for ITCC 41.

## 1. Project Description

This project is an improved Student Profile application for **Denz Godwen D. Macasero**, a BSIT student. Activity 3 focuses on responsive design and Mobile UI/UX Design Principles. The application adapts its layout, spacing, typography, navigation, and content for desktop, tablet, and mobile screen sizes.

## 2. Application Structure

The application is organized into these main parts:

* **Header** — contains the profile picture, complete name, subtitle, and navigation menu.
* **Navigation Menu** — contains **About** and **Skills** links that move to sections on the same page.
* **About Section** — contains personal information, interests, educational background, and goals.
* **Skills Section** — contains six skills with short descriptions.
* **Footer** — contains the copyright notice, name, and current year.

Main files:

```text
Macasero_StudentProfile/
├── config.xml
├── package.json
├── README.md
├── screenshots/
└── www/
    ├── index.html
    ├── css/
    │   └── index.css
    ├── img/
    │   └── profile.jpg
    └── js/
        └── index.js
```

## 3. Responsive Design

The Student Profile uses CSS media queries to adapt the layout to different screen sizes.

Responsive techniques applied:

* Flexible containers using percentages and `max-width`.
* CSS Grid for desktop and tablet layouts.
* A single-column layout for smaller screens.
* Flexible buttons and navigation controls.
* `clamp()` for responsive heading sizes.
* `flex-wrap` for tags and controls.
* `max-width: 100%` for images.
* `overflow-x: hidden` to prevent unnecessary horizontal scrolling.
* Mobile-specific spacing and navigation rules at smaller breakpoints.

Breakpoints used:

* **Desktop:** above 900px
* **Tablet:** 601px–900px
* **Mobile:** 320px–600px

## 4. UI/UX Principles Applied

### Responsive Layout

The layout changes from a multi-column desktop design to a two-column tablet design and then to a single-column mobile design. This keeps content organized without overlapping or unnecessary horizontal scrolling.

### Mobile-Friendly Spacing

Sections, headings, paragraphs, navigation links, buttons, and skill cards have consistent padding and margins. Mobile controls have a larger touch area for easier interaction.

### Appropriate Typography

The application uses a consistent system font, readable paragraph sizes, responsive headings, clear line spacing, and a visible difference between headings and supporting text.

### Clear Visual Hierarchy

The student's name and main heading are visually prominent. Section labels, headings, descriptions, skill names, and supporting information use different sizes and weights to make the information easy to scan.

### Usable Controls

The About and Skills links have clear labels, sufficient spacing, and touch-friendly sizing. Buttons are also large enough to use comfortably on smaller screens.

### Basic Accessibility

The application uses semantic HTML elements, meaningful headings, an accessible navigation label, descriptive image alternative text, readable text, visible focus states, and sufficient contrast. Important information does not depend only on color.

### Consistent Design

The same typography, spacing system, border radius, card treatment, navigation style, and visual language are used throughout the Header, About, Skills, and Footer sections.

## 5. Navigation

The **About** and **Skills** links use normal HTML anchor links:

```html
<a href="#about">About</a>
<a href="#skills">Skills</a>
```

Each link navigates to the corresponding section within the same page. **JavaScript is not used for navigation or responsive behavior.**

## 6. How to Run

### Requirements

* Node.js and npm
* Apache Cordova
* Android Studio and Android SDK if running on Android
* Java JDK 17 for the required Cordova Android setup

### Install dependencies

Open a terminal inside the project folder:

```bash
npm install
```

If Cordova is not installed globally:

```bash
npm install -g cordova
```

### Add Android platform

```bash
cordova platform add android
```

### Build the application

```bash
cordova build android
```

The generated debug APK is normally located at:

```text
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

### Run on an Android emulator/device

```bash
cordova run android
```

## 7. Application Screenshots

### Desktop Layout

![Desktop Layout](https://github.com/user-attachments/assets/7f7f1e73-5b97-48a5-b92d-c780f44f76d6)

### Tablet Layout

![Tablet Layout](https://github.com/user-attachments/assets/1a2b5046-d5dd-45bd-9097-0147b7bdc317)

### Mobile Layout

![Mobile Layout](https://github.com/user-attachments/assets/19c99f5c-d995-446d-ac3d-857fdccaf19a)

### How the screenshots were tested

The application was tested at desktop, tablet, and mobile screen sizes using the **Mobile FIRST Chrome extension**.

Due to limited RAM on the laptop, the Cordova Android emulator was not used for mobile layout testing.

## Activity 3 Checklist

* [x] Same Activity 2 GitHub repository used
* [x] Public repository
* [x] Responsive desktop layout
* [x] Responsive tablet layout
* [x] Responsive mobile layout
* [x] Mobile-friendly spacing
* [x] Appropriate typography
* [x] Clear visual hierarchy
* [x] Usable About and Skills controls
* [x] Basic accessibility improvements
* [x] Consistent design
* [x] At least five skills with descriptions
* [x] About section has two paragraphs
* [x] Footer has name and current year
* [x] JavaScript not used for navigation/responsive behavior
* [x] Desktop screenshot
* [x] Tablet screenshot
* [x] Mobile screenshot

## Author

**Denz Godwen D. Macasero**
BSIT Student
Xavier University – Ateneo de Cagayan
