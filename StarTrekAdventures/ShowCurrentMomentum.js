const x = game.items.entities.find((i) => i.name === "Momentum");
const message = x.data.data.attributes["Momentum"].value;
const chatData = { user: game.userId, content: "Momentum: " + message };
ChatMessage.create(chatData, {});
