const momentumItem = game.items.entities.find((i) => i.name === "Momentum");

momentumItem.data.data.attributes.Momentum.value -= 1;

if(momentumItem.data.data.attributes.Momentum.value < 0){
    momentumItem.data.data.attributes.Momentum.value = 0;
}

const message = `<b>Momentum:</b> ${momentumItem.data.data.attributes.Momentum.value}`;
const chatData = { user: game.userId, content: message };
ChatMessage.create(chatData, {});
