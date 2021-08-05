const data = require('./data');

function getSpeciesByIds(...ids) {
  return data.species.filter((specie) => ids.some((id) => id === specie.id));
}

function getAnimalsOlderThan(animal, minimumAge) {
  return data.species.find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= minimumAge);
}

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.some((managerId) => managerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species !== undefined) {
    return data.species.find((specie) => specie.name === species).residents.length;
  }
  return data.species.reduce((acc, currentSpecie) => {
    const { name, residents } = currentSpecie;
    acc[name] = residents.length;
    return acc;
  }, {});
}

function calculateEntry({ Adult = 0, Child = 0, Senior = 0 } = {}) {
  const { Adult: adultEntry, Child: childEntry, Senior: seniorEntry } = data.prices;
  return Adult * adultEntry + Child * childEntry + Senior * seniorEntry;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
