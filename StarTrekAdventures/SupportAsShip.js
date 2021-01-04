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

const chatData = {
  user: game.userId,
  content: `Rolling ship support - ${activeSystem} (${systemScore}) & ${activeDepartment} (${departmentScore}) = ${successScore}`,
};
ChatMessage.create(chatData, {});

const roll = new Roll(`1d20cs<=${successScore}`);
roll.evaluate();

const promise = roll.getTooltip();

promise.then(function (result) {
  const chatData = { user: game.userId, content: result };
  ChatMessage.create(chatData, {});
});

let extraSuccess = 0;
for (let i = 0; i < roll.terms[0].results.length; i++) {
  if (roll.terms[0].results[i].result <= departmentScore) {
    extraSuccess += 1;
  }
}
if (extraSuccess > 0) {
  let chatData = {
    user: game.userId,
    content: `+${extraSuccess} successes from ship's department.`,
  };
  ChatMessage.create(chatData, {});
}
