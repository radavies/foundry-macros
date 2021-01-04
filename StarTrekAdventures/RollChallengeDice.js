const player = game.users.current.character;
const timesToRoll =
  player.data.data.attributes.Rolling.NumberOfChallengeDice.value;
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
