// utils/sendTelegram.js
export const sendTelegramMessage = async (message) => {
  const botToken = "8578676618:AAHNJ2Vr3VzEo0xd6OWDAlE0izkkR3e69wI"; // Bot token

  // Agar chat_id’ni avtomatik olish xohlansa:
  let chatId;
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const data = await res.json();
    
    if (data.result && data.result.length > 0) {
      // Oxirgi xabardagi chat_id ni olish
      chatId = data.result[data.result.length - 1].message.chat.id;
      console.log("Chat ID:", chatId);
    } else {
      console.log("Hali xabar kelmagan, botga /start yozing!");
      return; // chat_id bo'lmasa, xabar yuborilmaydi
    }
  } catch (err) {
    console.error("Chat ID olishda xatolik:", err);
    return;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });
    console.log("Xabar yuborildi!");
  } catch (error) {
    console.error("Telegramga habar yuborishda xatolik:", error);
  }
};
