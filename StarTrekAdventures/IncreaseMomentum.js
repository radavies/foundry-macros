const momentumItem = game.items.entities.find((i) => i.name === "Momentum");

momentumItem.data.data.attributes.Momentum.value += 1;

if(momentumItem.data.data.attributes.Momentum.value > 6){
    momentumItem.data.data.attributes.Momentum.value = 6;
}

const message = `<b>Momentum:</b> ${momentumItem.data.data.attributes.Momentum.value}`;
const chatData = { user: game.userId, content: message };
ChatMessage.create(chatData, {});
