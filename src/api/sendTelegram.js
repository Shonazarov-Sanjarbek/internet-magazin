// utils/sendTelegram.js

export const sendTelegramMessage = async (message) => {
  const botToken = "8578676618:AAHNJ2Vr3VzEo0xd6OWDAlE0izkkR3e69wI"; 
  const chatId = "6160963553"; 

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      }),
    });

    const data = await res.json();
    console.log("Telegram response:", data);
  } catch (error) {
    console.error("Telegram error:", error);
  }
};
