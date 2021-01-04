const x = game.items.entities.find((i) => i.name === "Momentum");
const message = x.data.data.attributes["Momentum"].value;
let chatData = { user: game.user._id, content: "Momentum: " + message };
ChatMessage.create(chatData, {});
