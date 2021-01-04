const player = game.users.current.character;

let activeAttribute = "Reason";
if (player.data.data.attributes.Attributes.ControlActive.value) {
  activeAttribute = "Control";
} else if (player.data.data.attributes.Attributes.FitnessActive.value) {
  activeAttribute = "Fitness";
} else if (player.data.data.attributes.Attributes.PresenceActive.value) {
  activeAttribute = "Presence";
} else if (player.data.data.attributes.Attributes.DaringActive.value) {
  activeAttribute = "Daring";
} else if (player.data.data.attributes.Attributes.InsightActive.value) {
  activeAttribute = "Insight";
}

let activeDiscipline = "Medicine";
if (player.data.data.attributes.Disciplines.CommandActive.value) {
  activeDiscipline = "Command";
} else if (player.data.data.attributes.Disciplines.SecurityActive.value) {
  activeDiscipline = "Security";
} else if (player.data.data.attributes.Disciplines.ScienceActive.value) {
  activeDiscipline = "Science";
} else if (player.data.data.attributes.Disciplines.ConnActive.value) {
  activeDiscipline = "Conn";
} else if (player.data.data.attributes.Disciplines.EngineeringActive.value) {
  activeDiscipline = "Engineering";
}

const attributeScore =
  player.data.data.attributes.Attributes[activeAttribute].value;
const disciplineScore =
  player.data.data.attributes.Disciplines[activeDiscipline].value;

const numberofDice = player.data.data.attributes.Rolling.NumberOfD20s.value;

const successScore = attributeScore + disciplineScore;

const chatData = {
  user: game.userId,
  content: `Rolling ${numberofDice}d20 Vs ${activeAttribute} (${attributeScore}) & ${activeDiscipline} (${disciplineScore}) = ${successScore}`,
};
ChatMessage.create(chatData, {});

const roll = new Roll(`${numberofDice}d20cs<=${successScore}`);
roll.evaluate();

const promise = roll.getTooltip();

promise.then(function (result) {
  const chatData = { user: game.userId, content: result };
  ChatMessage.create(chatData, {});
});

if (player.data.data.attributes.Rolling.ActiveFocus.value) {
  let extraSuccess = 0;
  for (let i = 0; i < roll.terms[0].results.length; i++) {
    if (roll.terms[0].results[i].result <= disciplineScore) {
      extraSuccess += 1;
    }
  }
  if (extraSuccess > 0) {
    const chatData = {
      user: game.userId,
      content: `+${extraSuccess} successes due to active focus.`,
    };
    ChatMessage.create(chatData, {});
  }
}
