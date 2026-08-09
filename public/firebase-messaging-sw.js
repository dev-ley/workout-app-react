importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAsf4cPId0cRoQDDbEtpLN3VABREpyKlyc",
  authDomain: "workout-app-e39a4.firebaseapp.com",
  projectId: "workout-app-e39a4",
  storageBucket: "workout-app-e39a4.firebasestorage.app",
  messagingSenderId: "187624655096",
  appId: "1:187624655096:web:ab1eec6d9f145e58bd130d",
  measurementId: "G-89LMC2B6EV",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Mensagem recebida em segundo plano:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});
