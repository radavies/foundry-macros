const momentumItem = game.items.entities.find((i) => i.name === "Momentum");
const message = `<b>Momentum:</b> ${momentumItem.data.data.attributes["Momentum"].value}`;
const chatData = { user: game.userId, content: message };
ChatMessage.create(chatData, {});
