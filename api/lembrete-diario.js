
import "dotenv/config";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

function inicializarFirebaseAdmin() {
  if (!process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error("Configuração do Firebase Admin incompleta.");
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
}

function horaEmPortugal() {
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  return partes.find((parte) => parte.type === "hour")?.value;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const segredo = process.env.CRON_SECRET;

  if (!segredo || req.headers.authorization !== `Bearer ${segredo}`) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  // Os dois horários UTC cobrem o horário de verão e o de inverno.
  // Só a execução que ocorrer às 7h em Portugal envia notificações.
  if (horaEmPortugal() !== "07") {
    return res.status(200).json({
      ok: true,
      enviado: false,
      motivo: "Fora das 7h em Portugal continental",
    });
  }

  try {
    inicializarFirebaseAdmin();

    const db = getFirestore();
    const snapshot = await db.collection("tokens").get();

    if (snapshot.empty) {
      return res.status(200).json({
        ok: true,
        enviados: 0,
        falhas: 0,
        mensagem: "Nenhum dispositivo registado",
      });
    }

    const tokens = snapshot.docs
      .map((documento) => ({
        id: documento.id,
        token: documento.data().token || documento.id,
      }))
      .filter((item) => Boolean(item.token));

    let enviados = 0;
    let falhas = 0;
    const tokensInvalidos = [];

    for (let i = 0; i < tokens.length; i += 500) {
      const lote = tokens.slice(i, i + 500);

      const resultado = await getMessaging().sendEachForMulticast({
        tokens: lote.map((item) => item.token),
        notification: {
          title: "Hora de treinar! 💪",
          body: "Está na hora de cuidar de ti. Abre o Workout App e começa o teu treino!",
        },
      });

      enviados += resultado.successCount;
      falhas += resultado.failureCount;

      resultado.responses.forEach((resposta, indice) => {
        if (!resposta.success) {
          const codigo = resposta.error?.code;

          if (
            codigo === "messaging/registration-token-not-registered" ||
            codigo === "messaging/invalid-registration-token"
          ) {
            tokensInvalidos.push(lote[indice].id);
          }

          console.error("Falha no envio FCM:", {
            codigo,
            tokenId: lote[indice].id,
          });
        }
      });
    }

    if (tokensInvalidos.length > 0) {
      const batch = db.batch();

      for (const id of tokensInvalidos) {
        batch.delete(db.collection("tokens").doc(id));
      }

      await batch.commit();
    }

    return res.status(200).json({
      ok: true,
      enviados,
      falhas,
      tokensInvalidosRemovidos: tokensInvalidos.length,
    });
  } catch (erro) {
    console.error("Erro no lembrete diário:", erro);

    return res.status(500).json({
      error: "Erro ao processar o lembrete diário",
    });
  }
}
