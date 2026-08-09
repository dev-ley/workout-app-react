import fetch from "node-fetch";
import jwt from "jsonwebtoken";

/**
 * Gera um token JWT temporário para autenticar na API FCM (V1)
 */
function gerarAccessToken() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600, // válido por 1 hora
  };

  const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  return token;
}

/**
 * Envia uma notificação push via Firebase Cloud Messaging (API V1)
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    const jwtToken = gerarAccessToken();

    // Solicita um access token OAuth2
    const oauthResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken,
      }),
    });

    const { access_token } = await oauthResponse.json();

    // Envia a notificação
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            token,
            notification: { title, body },
          },
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Erro ao enviar notificação:", err);
    return res.status(500).json({ error: "Falha ao enviar notificação" });
  }
}
