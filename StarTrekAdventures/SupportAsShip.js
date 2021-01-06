const player = game.users.current.character;

let activeSystem = "Communications";
if (player.data.data.attributes.ShipSystems.Engines.value) {
  activeSystem = "Engines";
} else if (player.data.data.attributes.ShipSystems.Computers.value) {
  activeSystem = "Computers";
} else if (player.data.data.attributes.ShipSystems.Weapons.value) {
  activeSystem = "Weapons";
} else if (player.data.data.attributes.ShipSystems.Structure.value) {
  activeSystem = "Structure";
} else if (player.data.data.attributes.ShipSystems.Sensors.value) {
  activeSystem = "Sensors";
}

let activeDepartment = "Medicine";
if (player.data.data.attributes.ShipDepartments.Command.value) {
  activeDepartment = "Command";
} else if (player.data.data.attributes.ShipDepartments.Security.value) {
  activeDepartment = "Security";
} else if (player.data.data.attributes.ShipDepartments.Science.value) {
  activeDepartment = "Science";
} else if (player.data.data.attributes.ShipDepartments.Conn.value) {
  activeDepartment = "Conn";
} else if (player.data.data.attributes.ShipDepartments.Engineering.value) {
  activeDepartment = "Engineering";
}

const ship = game.items.entities.find((i) => i.name === "USS Gryphon");
const systemScore = ship.data.data.attributes.Systems[activeSystem].value;
const departmentScore =
  ship.data.data.attributes.Departments[activeDepartment].value;

const successScore = systemScore + departmentScore;

let chatContent = `<p>Rolling ship support - <b>${activeSystem}</b> (${systemScore}) & <b>${activeDepartment}</b> (${departmentScore}) = ${successScore}</p>`;

const roll = new Roll(`1d20cs<=${successScore}`);
roll.evaluate();

const promise = roll.getTooltip();

promise.then(function (result) {

  let extraSuccess = 0;
  for (let i = 0; i < roll.terms[0].results.length; i++) {
    if (roll.terms[0].results[i].result <= departmentScore) {
      extraSuccess += 1;
    }
  }
  if (extraSuccess > 0) {
    chatContent += `<p><i>+${extraSuccess} successes from ship's department.</i></p>`;
  }

  chatContent += result;
  
  const chatData = {
    user: game.userId,
    content: chatContent,
  };
  ChatMessage.create(chatData, {});
});
