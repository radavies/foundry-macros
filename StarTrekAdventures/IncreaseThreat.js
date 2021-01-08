const threatItem = game.items.entities.find((i) => i.name === "Threat");

threatItem.data.data.attributes.Threat.value += 1;

const message = `<b>Threat:</b> ${threatItem.data.data.attributes.Threat.value}`;
const chatData = { user: game.userId, content: message };
ChatMessage.create(chatData, {});
