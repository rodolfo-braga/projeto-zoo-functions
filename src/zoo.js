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
  const getHours = data.hours;
  if (!dayName) {
    const weekDays = Object.keys(data.hours);
    return weekDays.reduce((acc, currentDay) => {
      const day = getHours[currentDay];
      if (day.open === 0) {
        acc[currentDay] = 'CLOSED';
        return acc;
      }
      acc[currentDay] = `Open from ${[day.open]}am until ${[day.close] - 12}pm`;
      return acc;
    }, {});
  }
  const getDay = getHours[dayName];
  if (getDay.open === 0) return { [dayName]: 'CLOSED' };
  return { [dayName]: `Open from ${[getDay.open]}am until ${[getDay.close] - 12}pm` };
}

function getOldestFromFirstSpecies(id) {
  const firstSpecie = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const specieResidentsSorted = data.species
    .find((specie) => specie.id === firstSpecie).residents
    .sort((a, b) => b.age - a.age);
  return specieResidentsSorted.reduce((acc, currentResident, index) => {
    if (index === 0) {
      acc.push(currentResident.name);
      acc.push(currentResident.sex);
      acc.push(currentResident.age);
    }
    return acc;
  }, []);
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;
  const updatedPrices = {
    Adult: Math.round((Adult * ((percentage / 100) + 1)) * 100) / 100,
    Child: Math.round((Child * ((percentage / 100) + 1)) * 100) / 100,
    Senior: Math.round((Senior * ((percentage / 100) + 1)) * 100) / 100,
  };
  data.prices = updatedPrices;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return data.employees.reduce((acc, currentEmployee) => {
      const employeeFullName = `${currentEmployee.firstName} ${currentEmployee.lastName}`;
      acc[employeeFullName] = currentEmployee.responsibleFor
        .map((specieId) => data.species.find(({ id }) => id === specieId).name);
      return acc;
    }, {});
  }
  const findEmployee = data.employees
    .find(({ id, firstName, lastName }) => id === idOrName
      || firstName === idOrName
      || lastName === idOrName);
  return { [`${findEmployee.firstName} ${findEmployee.lastName}`]: findEmployee
    .responsibleFor.map((specieId) => data.species.find(({ id }) => id === specieId).name),
  };
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
