# 💪 Workout App

**A web application for workout management and fitness routine tracking.**

Workout App is a project built with React, TypeScript, and Firebase, focused on delivering a modern, responsive experience that can evolve with new fitness management features.

The application uses Google authentication, Firestore data persistence, and infrastructure for push notifications.

## 🖥️ Application Preview

![Workout App Dashboard](public/images/WorkoutReactApp.jpeg)

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Technologies](#-technologies)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Firebase Configuration](#-firebase-configuration)
- [Running the Project](#-running-the-project)
- [Application Routes](#-application-routes)
- [Push Notifications](#-push-notifications)
- [Progressive Web App](#-progressive-web-app)
- [Production Build](#-production-build)
- [Security](#-security)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About the Project

Workout App was created as the foundation for a fitness application featuring a modern interface, user authentication, and integration with Firebase services.

The project uses a component-based React architecture, TypeScript for static typing, and Vite for development and production builds.

Firebase integration provides authentication, data storage, and notification capabilities, while the application structure supports the addition of new modules as development progresses.

### Project Goals

- Provide a simple and intuitive user interface.
- Enable secure user authentication.
- Organize application navigation.
- Integrate cloud-based services.
- Prepare the application for push notifications.
- Make the codebase easier to maintain and extend.

## ✨ Features

### Authentication and Access

- Google sign-in.
- Authentication state management through a React context.
- Integration with Firebase Authentication.
- Protected pages for authenticated users.
- Navigation and redirection between application pages.

### Interface and Navigation

- Interface built with React and TypeScript.
- CSS-based styling.
- Navigation using React Router.
- Responsive layout for different screen sizes.
- Dark theme with purple accents.

### Data and Services

- Integration with Cloud Firestore.
- Local persistence configuration for data access in supported offline scenarios.
- Infrastructure for storing and managing notification tokens.

### Notifications

- Integration with Firebase Cloud Messaging (FCM).
- Device notification token registration.
- Dedicated service worker for receiving push notifications.
- Notification delivery endpoints through a server-side integration.

> **Project status:** The features above describe the integrations known to be part of the application. Complete workout, exercise, student, training plan, and reporting modules should be documented as they are implemented.

---

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| React 19 | User interface development |
| TypeScript | Static typing and maintainability |
| Vite 8 | Development server and production builds |
| React Router 7 | Navigation and route management |
| Firebase Authentication | User authentication |
| Cloud Firestore | NoSQL database |
| Firebase Cloud Messaging | Push notifications |
| Progressive Web App | Installable web application capabilities |
| CSS | Styling and visual identity |
| Node.js and npm | Development environment and dependency management |

---

## 🏗️ Architecture

The application is organized into layers with distinct responsibilities:

- **Interface:** pages, components, and styles.
- **Navigation:** route definitions and access control.
- **Authentication:** context responsible for the user's authentication state.
- **Services:** integration with Firebase and other external services.
- **Notifications:** token registration and communication with the notification delivery service.
- **Service workers:** support for PWA features and background notifications, depending on browser capabilities.

### Simplified Flow

```text
User
  |
  v
React Interface
  |
  v
React Router
  |
  v
Authentication Context
  |
  v
Firebase Authentication
  |
  v
Authenticated Application
  |
  +----> Cloud Firestore
  |
  +----> Firebase Cloud Messaging
                 |
                 v
         Notification Service
```

---

## 📋 Prerequisites

Before getting started, install the following:

- [Node.js](https://nodejs.org/) — a version compatible with the project's dependencies.
- npm, included with Node.js.
- [Git](https://git-scm.com/) for cloning the repository.
- A Google account.
- A project configured in the [Firebase Console](https://console.firebase.google.com/).

Verify your installations:

```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone REPOSITORY_URL
```

Replace `REPOSITORY_URL` with the actual repository URL.

### 2. Navigate to the Project Directory

```bash
cd workout-app
```

Adjust the directory name if the repository uses a different name.

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and provide the Firebase configuration values.

The variable names must match those used by the application's Firebase initialization file.

### 5. Start the Development Server

```bash
npm run dev
```

Vite will display the local application URL in the terminal, typically:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

## 🔥 Firebase Configuration

The project uses Firebase for authentication, database operations, and notifications.

### 1. Create a Firebase Project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project or select an existing one.
3. Register a Web application.
4. Copy the configuration values provided by Firebase.

The Firebase project used during development is `workout-app-e39a4`. When running the application in another environment, use the configuration associated with the intended Firebase project.

### 2. Configure Authentication

In the Firebase Console:

1. Open **Authentication**.
2. Navigate to the sign-in providers.
3. Enable Google as a sign-in provider.
4. Configure the application's authorized domains.
5. Review the consent screen and provider settings where applicable.

The configuration must match the authentication flow implemented in the frontend.

### 3. Configure Firestore

1. Open **Firestore Database**.
2. Create the database if it does not already exist.
3. Configure the security rules.
4. Ensure the paths and permissions used by the application match the published rules.

Do not use unrestricted read and write rules in production.

### 4. Configure Environment Variables

The following is an example configuration for a Vite application using Firebase:

```dotenv
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
VITE_FIREBASE_VAPID_KEY=YOUR_PUBLIC_VAPID_KEY
```

Replace each placeholder with the appropriate value from your Firebase configuration.

**Important:** This is a reference template. Confirm the exact variable names in `src/services/firebase.ts` before using it. Do not add variables that the application does not use.

Firebase Web configuration values may be public identifiers, but this does not replace Firestore security rules or backend protection. Never expose administrative credentials, private keys, or secret tokens through `VITE_*` variables.

### 5. Protect Local Configuration Files

Add the following entries to `.gitignore` if they are not already present:

```gitignore
node_modules/
dist/
.env.local
.env.*.local
```

Do not commit private configuration values, server credentials, or access tokens to GitHub.

---

## 🧭 Application Routes

The known application routes are:

| Route | Purpose |
|---|---|
| `/` | Login page |
| `/cadastro` | Registration route present in the application structure; availability of the flow depends on the current configuration |
| `/dashboard` | Main application area after authentication |

Access permissions should be enforced by the protected-route implementation, not merely by hiding links in the interface.

---

## 🔔 Push Notifications

The project uses Firebase Cloud Messaging to provide the infrastructure for sending and receiving notifications.

### Related Components

- `src/services/firebase.ts`: Firebase service initialization and configuration.
- `/firebase-messaging-sw.js`: service worker associated with Firebase Cloud Messaging.
- `/sw.js`: application service worker.
- `/api/salvar-token`: endpoint associated with device token storage.
- `/api/enviar-notificacao`: endpoint associated with notification delivery.

The corresponding server-side service must implement and expose these endpoints for the operations to work.

### General Workflow

1. The browser requests permission to display notifications.
2. The application obtains an FCM token when the required conditions are met.
3. The token is sent to the service responsible for registration.
4. The server can use Firebase infrastructure to send notifications to the device.
5. The browser processes incoming messages according to permissions, application state, and platform support.

### Additional Requirements

- Configure Firebase Cloud Messaging.
- Generate and configure the public VAPID key where required.
- Verify service worker paths and contents.
- Configure server authentication for notification delivery.
- Test notifications in a compatible HTTPS environment.

Registering device tokens does not automatically provide a notification scheduler. Recurring notifications, such as daily workout reminders, require a dedicated backend implementation or scheduling service.

---

## 📱 Progressive Web App

The application uses `vite-plugin-pwa` to provide Progressive Web App capabilities.

A PWA can support features such as:

- Installation on supported devices.
- An experience similar to a native installed application.
- Static asset caching.
- Offline strategies, depending on the configuration.
- Service worker integration.

Actual behavior depends on the plugin configuration, caching strategies, and browser capabilities. Development behavior may differ from production.

---

## 🏭 Production Build

Generate a production build by running:

```bash
npm run build
```

The compiled files are normally generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

Vite will display the preview URL in the terminal.

Before deployment, verify environment variables, Firebase authorized domains, Firestore security rules, and the notification service configuration.

---

## 🔐 Security

Security should be considered at every layer of the application.

- Use restrictive Cloud Firestore security rules.
- Validate user permissions for server-side operations.
- Never expose administrative credentials or private keys in the frontend.
- Protect token registration and notification delivery endpoints against misuse.
- Validate data received by the backend.
- Use HTTPS in production.
- Do not rely exclusively on the interface to prevent unauthorized access.
- Avoid logging unnecessary tokens, credentials, or personal data.
- Review service worker permissions and configuration before deployment.

---

## 🗺️ Future Improvements

The Workout App can evolve with additional modules as they are implemented and tested:

- [ ] Exercise creation and management.
- [ ] Workout routine creation and organization.
- [ ] User-specific workout planning.
- [ ] Workout history tracking.
- [ ] Performance and progress tracking.
- [ ] Workout calendar and reminders.
- [ ] Scheduled notifications.
- [ ] Progress reports and performance indicators.
- [ ] Automated testing.
- [ ] Continuous integration and deployment pipeline.

These items represent potential future improvements, not a claim that every feature is already available.

---

## 🤝 Contributing

Contributions are welcome.

To propose a change:

1. Fork the repository.
2. Create a branch for your feature:

   ```bash
   git checkout -b feature/new-feature
   ```

3. Implement and test your changes.
4. Create a descriptive commit:

   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push the branch to your fork.
6. Open a Pull Request describing your changes.

Keep your code consistent with the existing architecture and avoid committing local configuration files or credentials.

---

## 📄 License

The project's license has not yet been defined.

Before distributing the application or accepting external contributions, add a `LICENSE` file containing the chosen licensing terms.

---

## 👨‍💻 Development

**Workout App**

A web application built with React, TypeScript, Vite, and Firebase.

For suggestions, questions, or bug reports, use the repository's Issues section if it is enabled.

---

*This README will be updated as new features are implemented and verified.*
