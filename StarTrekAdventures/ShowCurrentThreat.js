const x = game.items.entities.find((i) => i.name === "Threat");
const message = x.data.data.attributes["Threat"].value;
const chatData = { user: game.userId, content: "<b>Threat:</b> " + message };
ChatMessage.create(chatData, {});
