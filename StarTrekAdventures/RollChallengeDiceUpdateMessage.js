const player = game.users.current.character;

const timesToRoll =
  player.data.data.attributes.Rolling.NumberOfChallengeDice.value;

const table = game.tables.entities.find((t) => t.name === "Challenge Dice");

const promise = table.drawMany(timesToRoll, { displayChat: false });

let chatContent = '';

const log = new ChatLog();

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

  chatContent = `<p><b>Total:</b> ${total}, <b>Effects:</b> ${effects}</p>`;

  const promise = table.toMessage(result.results, {roll: result.roll});
  promise.then(function (result) {

    //This is a bit hacky, I grab the last message posted (which should be from toMessage)
    //Then update the content by adding the extra message context
    //Issue with this approach is only the current player can see the updated message.
    chatContent = result.data.content + chatContent;
    game.messages.entries[game.messages.entries.length -1].data.content = chatContent;
    log.updateMessage(game.messages.entries[game.messages.entries.length -1]);

  });

});
