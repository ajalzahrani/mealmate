const createError = require("http-errors");

const getWeek = (week) => {
  switch (week) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
      return 1;
    case 4:
      return 2;
    default:
      return 0;
  }
};

// Array of day names
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getDayWeek = () => {
  try {
    const day = new Date();
    const currentDay = daysOfWeek[day.getDay()];

    const startOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);
    const firstDayOfWeek = startOfMonth.getDay();
    const dayOfMonth = day.getDate();

    // Calculate the week number (1-4)
    const week = Math.floor((dayOfMonth + firstDayOfWeek - 1) / 7) + 1;

    // Ensure the week number does not exceed 4
    const actualWeek = week > 4 ? 4 : week;

    const result = {
      dayOfWeek: day.getDay(),
      menuDay: currentDay,
      dayOfMonth: day.getDate(),
      menuWeek: getWeek(actualWeek),
      actualWeek: actualWeek,
      month: day.getMonth() + 1,
      year: day.getFullYear(),
    };

    if (!result) {
      console.log("dayWeekData not found");
      throw createError.NotFound();
    } else {
      return result;
    }
  } catch (error) {
    throw createError.InternalServerError(error);
  }
};

module.exports = { getDayWeek };
