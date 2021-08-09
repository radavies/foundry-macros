const player = game.users.current.character;

const timesToRoll =
  player.data.data.attributes.Rolling.NumberOfChallengeDice.value;

const table = game.tables.contents.find((t) => t.name === "Challenge Dice");

const promise = table.drawMany(timesToRoll, { displayChat: false });

let chatContent = '';

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

  // This is a bit of a hack, I'm using blind roll to "hide" the automatic message from toMessage()
  // I then get the message and repost it with the extra context added.
  const promise = table.toMessage(result.results, { roll: result.roll, messageOptions: { rollMode: "blindroll" } });
  promise.then(function (result) {
    chatContent = result.data.content + chatContent;

    const chatData = {
      user: game.userId,
      content: chatContent,
    };
    ChatMessage.create(chatData, {});
  });

});
