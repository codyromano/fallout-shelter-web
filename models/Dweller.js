const randomName = require('node-random-name');
const randomNumber = require('random-number');

/**
* @returns A map of randomly generated SPECIAL attributes.
* s = strength
* p = perception
* e = endurance
* c = charisma
* i = intelligence
* a = agility
* l = luck
*/
function getDefaultSpecial() {
  return 'special'.split('').reduce((result, letter) => {
    result[letter] = randomNumber(1, 4);
    return result;
  }, {});
}

function getRandomName(gender) {
  const fullName = randomName({gender}),
        firstName = fullName.split(' ')[0],
        lastName = fullName.split(' ')[1];

  return {fullName, firstName, lastName};
}

function getDefaultOptions() {
  const gender = randomNumber(0, 1) >= 0.5 ? 'male' : 'female';
  const {fullName, firstName, lastName} = getRandomName(gender);

  return {
    fullName,
    firstName,
    lastName,
    gender,
    xp: 0,
    special: getDefaultSpecial()
  };
}

export default class Dweller {
  constructor(options = {}) {
    Object.assign(this, getDefaultOptions(), options);
  }
  getLevel() {
    // Level-up difficulty increases exponentially
    return Math.max(1, Math.sqrt(this.xp));
  }
}