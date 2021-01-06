# Foundry Macros

My macros for Foundry VTT (https://foundryvtt.com/)

## Star Trek Adventures

In the StarTrekAdventures folder you will find macros to help play the Mophidius STA 2d20 RPG using Foundry.

The macros do the following:

- Roll x number of d20s to perform tasks - selecting an attribute and discipline to roll against and including a focus.
- Roll 1d20 to aid tasks as the ship - selecting a system and department to roll against.
- Roll x number of challenge dice for attacks and damage etc.
- Display the current momentum.
- Display the current threat.

There is also a folder with some screen grabs in it to show how the macros work and how to setup the supporting items.

To make these macros work you will need to do the following.

### System

Install the Simple World Building system and create a world using it.

### Players / Actors

Ensure that your players select their character in the "Player Configuration" pop up (either when they log in or by right clicking thier nmame in the players window).

Create a template actor and base all player characters from this template.

In the attributes for the actor template create the following:

- A section called Rolling, with the following inside it:
  - ActiveFocus (boolean)
  - NumberOfChallengeDice (number)
  - NumberOfD20s (number)
- A section called Attributes, with the following inside it:
  - A number named for each of the player attributes (Control, Daring, etc)
  - A boolean for each player attribute, postfixed with Active (ControlActive, DaringActive, etc)
- A section called Disciplines, with the following inside it:
  - A number named for each of the player disciplines (Command, Conn, etc)
  - A boolean for each player discipline, postfixed with Active (CommandActive, ConnActive, etc)
- A section called ShipSystems with a boolean for each ship system inside it (Engines, Computers, etc)
- A section called ShipDepartments with a boolean for each ship department inside it (Command, Conn, etc)

### Items

You will need to create several items to support the macros.

- Create an item called Momentum, give it a resource attribute called Momentum.
- Create an item called Threat, give it a number attribute called Threat.
- Create an item with the name of your PC's ship (you will need to update the name of the ship in the SupportAsShip.js macro).
  - In the ship item create an attribute group called Systems and create a number attribute inside it for each of the systems (Engines, Communications)
  - Also create an attribute group called Departments and create a number attribute inside it for each of the departments (Command, Conn, etc)
- Create an item for each of the weapons you want to support. Each weapon needs the following attributes:
  - Damage (number), the number of challenge dice that weapon gives
  - Type (string), either ranged or melee

For the weapons, you must give these to the players in their character sheet. The macro currently only supports each player having one ranged and one melee weapon.

_Make sure the PCs have at least observer permissions on these items._

### Roll Tables

Create a roll table called "Challenge Dice".

- Make the roll table formula d6
- Make sure "draw with replacement" is checked
- Make sure "display roll to chat" is checked
- Create results with the following data:
  - Text, Result: 1, Weight: 1, Range 1-1
  - Text, Result: 2, Weight: 1, Range 2-2
  - Text, Result: 0, Weight: 1, Range 3-4
  - Text, Result: 1 plus effect, Weight: 1, Range 5-6

You can give each of the results a little icon if you want to make it display more clearly in the chat.

_Make sure the PCs have observer permissions on the table._

### The Macros

Create a macro for each of the files here you want to use. Make sure and select the "script" type when creating the macro.

You can give each of the macros a little icon if you want them to look better in the tool bar.

_Make sure the PCs have observer permissions on the macros so they can see them._

### Modules

For the best experience you should install and activate the "Actually Private Rolls" module.
