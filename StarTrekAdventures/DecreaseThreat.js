const ThreatItem = game.items.entities.find((i) => i.name === "Threat");

ThreatItem.data.data.attributes.Threat.value -= 1;

if(ThreatItem.data.data.attributes.Threat.value < 0){
    ThreatItem.data.data.attributes.Threat.value = 0;
}

const message = `<b>Threat:</b> ${ThreatItem.data.data.attributes.Threat.value}`;
const chatData = { user: game.userId, content: message };
ChatMessage.create(chatData, {});
