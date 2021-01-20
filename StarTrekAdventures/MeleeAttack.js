const player = game.users.current.character;

const securityValue =
  player.data.data.attributes.Disciplines.Security.value;

let weaponDamage = 1;
let weaponName = "melee weapon";
for(let i=0; i<player.items.size; i++){
    const item = player.items.entries[i];
    if(item.data.data.attributes.Type && item.data.data.attributes.Type.value === "Melee"){
        weaponDamage = item.data.data.attributes.Damage.value;
        weaponName = item.name;
    }
}
  
const timesToRoll = securityValue + weaponDamage;

const attackMessage = `<p>Attacking with <b>${weaponName}</b> (${timesToRoll})</p>`;

const table = game.tables.entities.find((t) => t.name === "Challenge Dice");
const promise = table.drawMany(timesToRoll, { displayChat: false });
promise.then(function (result) {
  let total = 0;
  let effects = 0;
  for (let counter = 0; counter < result.results.length; counter++) {
    if (result.results[counter].text === "1") {
      total += 1;
    } else if (result.results[counter].text === "2") {
      total += 2;
    }
    if (result.results[counter].text === "1, plus effect") {
      total += 1;
      effects += 1;
    }
  }
  const totalMessage = `<p><b>Total:</b> ${total}, <b>Effects:</b> ${effects}</p>`;

  // This is a bit of a hack, I'm using blind roll to "hide" the automatic message from toMessage()
  // I then get the message and repost it with the extra context added.
  const promise = table.toMessage(result.results, {roll: result.roll, messageOptions:{rollMode: "blindroll"}});
  promise.then(function (result) {
    const chatContent = attackMessage + result.data.content + totalMessage;

    const chatData = {
      user: game.userId,
      content: chatContent,
    };
    ChatMessage.create(chatData, {});
  });

});
