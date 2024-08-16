const createError = require("http-errors");
const {
  sql_query_fetch_patient_byMRN,
  sql_query_fetch_patient_diet_byMRN,
} = require("../utils/sql-query");
const { logEvents } = require("../middleware/Log_Event");

const menu = {};

const menuitem = async (req, res, next) => {
  try {
    const pid = req.query.pid;
    console.log({ pid });

    // Query database based on pid
    let result = null;

    result = await sql_query_fetch_patient_diet_byMRN(pid);
    console.log({ result });

    if (!result) {
      console.log("No data found 1");
      // createError.BadRequest("No data found");
      throw createError.NotFound();
    }

    // Response handling
    if (result.recordset.length === 0) {
      console.log("No data found 2");
      // createError.BadRequest("No data found");
      throw createError.NotFound();
    } else {
      res.status(200).json(result.recordsets[0][0]);
    }
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

module.exports = { menu };
