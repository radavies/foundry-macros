const player = game.users.current.character;

const securityValue =
  player.data.data.attributes.Disciplines.Security.value;

let weaponDamage = 1;
let weaponName = "weapon";
for(let i=0; i<player.items.size; i++){
    const item = player.items.entries[i];
    if(item.data.data.attributes.Type.value === "Ranged"){
        weaponDamage = item.data.data.attributes.Damage.value;
        weaponName = item.name;
    }
}
  
const timesToRoll = securityValue + weaponDamage;

const chatData = {
    user: game.userId,
    content: `Firing ${weaponName} (${timesToRoll})`,
  };
  ChatMessage.create(chatData, {});

const table = game.tables.entities.find((t) => t.name === "Challenge Dice");
const promise = table.drawMany(timesToRoll, { displayChat: true });
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
  const chatData = {
    user: game.userId,
    content: `Total: ${total}, Effects: ${effects}`,
  };
  ChatMessage.create(chatData, {});
});