const createError = require("http-errors");
const {
  sql_query_fetch_mealMaster,
  sql_query_insert_mealMaster,
  sql_query_fetch_menuItemDay,
  sql_query_insert_menuItem,
  sql_query_delete_menuItemById,
  sql_query_insert_menuItemByName,
} = require("../utils/sql-query");
const { logEvents } = require("../middleware/Log_Event");
const { getDayWeek } = require("../utils/day-week");

const getAllMeals = async (req, res, next) => {
  try {
    const result = await sql_query_fetch_mealMaster();
    if (!result) {
      console.log("No data found");
      throw createError.NotFound();
    } else {
      res.status(200).json(result.recordsets[0]);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const addMeal = async (req, res, next) => {
  try {
    const name = req.body.name;
    const weight = req.body.weight;
    const calories = req.body.calories;
    const name2l = req.body.name2l;
    const weight2l = req.body.weight2l;
    const calories2l = req.body.calories2l;

    const result = await sql_query_insert_mealMaster(
      name,
      weight,
      calories,
      name2l,
      weight2l,
      calories2l
    );
    if (!result) {
      console.log("No data found no resulte");
      throw createError.NotFound();
    } else {
      if (result.recordsets[0][0].status !== -1) {
        res.status(200).json(result.recordsets[0][0].message);
      } else {
        throw createError[405](result.recordsets[0][0].message);
      }
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const addMenuItem = async (req, res, next) => {
  try {
    const category = req.body.category;
    const mealID = req.body.mealID;
    const mealTime = req.body.mealTime;
    const mealDay = req.body.mealDay;
    const mealWeek = req.body.mealWeek;

    console.log("coming info: ", {
      category,
      mealID,
      mealTime,
      mealDay,
      mealWeek,
    });
    const result = await sql_query_insert_menuItem(
      category,
      mealID,
      mealTime,
      mealDay,
      mealWeek
    );

    // parse result and check status
    const parsedResult = result.recordsets[0][0];

    if (!result) {
      console.log("No data found");
      throw createError.NotFound();
    } else {
      if (parsedResult.status === -1) {
        throw createError[405](parsedResult.message);
      } else {
        res.status(200).json(result.recordsets[0]);
      }
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const addMenuItemByName = async (req, res, next) => {
  try {
    const category = req.body.category;
    const mealName = req.body.mealName;
    const mealTime = req.body.mealTime;
    const mealDay = req.body.mealDay;
    const mealWeek = req.body.mealWeek;

    console.log("coming info: ", {
      category,
      mealName,
      mealTime,
      mealDay,
      mealWeek,
    });
    const result = await sql_query_insert_menuItemByName(
      category,
      mealName,
      mealTime,
      mealDay,
      mealWeek
    );

    // parse result and check status
    const parsedResult = result.recordsets[0][0];

    if (!result) {
      console.log("No data found");
      throw createError.NotFound();
    } else {
      if (parsedResult.status === -1) {
        throw createError[405](parsedResult.message);
      } else {
        res.status(200).json(result.recordsets[0]);
      }
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const getDayMenu = async (req, res, next) => {
  try {
    let mealTime = "";
    let mealDay = getDayWeek().menuDay;
    let mealWeek = getDayWeek().menuWeek.toString();
    let viewBy = 2;

    if (
      req.body &&
      req.body.mealDay !== undefined &&
      req.body.mealDay !== null
    ) {
      mealTime = req.body.mealTime || mealTime;
      mealDay = req.body.mealDay || mealDay;
      mealWeek = req.body.mealWeek || mealWeek;
      viewBy = req.body.viewBy || viewBy;
    }

    const result = await sql_query_fetch_menuItemDay(
      mealTime,
      mealDay,
      mealWeek,
      viewBy
    );
    console.log({ result });
    if (!result) {
      console.log("No data found");
      throw createError.NotFound();
    } else {
      res.status(200).json(result.recordsets[0]);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    const id = req.body.id;

    console.log("coming info: ", { id });
    const result = await sql_query_delete_menuItemById(id);
    if (!result) {
      console.log("No data found");
      throw createError.BadRequest();
    } else {
      res.status(200).json(result.recordsets[0]);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

module.exports = {
  getAllMeals,
  addMeal,
  addMenuItem,
  addMenuItemByName,
  getDayMenu,
  deleteMenuItem,
};
