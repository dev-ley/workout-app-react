self.addEventListener("install", () => {
  console.log("Service Worker instalado");
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("Service Worker ativo");
});

// ===== RECEBER NOTIFICAÇÕES PUSH =====
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "Notificação", {
    body: data.body || "",
    icon: "/images/icon-192.png",
    badge: "/images/icon-192.png",
  });
});
