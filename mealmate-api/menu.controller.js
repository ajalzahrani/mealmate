const {
  sql_query_fetch_patient_byMRN,
  sql_query_fetch_patient_diet_byMRN,
} = require("./utils/sql-query");
const { logEvents } = require("./middleware/Log_Event");

const menu = async (req, res, next) => {
  try {
    const pid = req.query.pid;

    // Query database based on pid
    let result = null;

    result = await sql_query_fetch_patient_diet_byMRN(pid);

    if (!result) {
      res.status(400).send("No data found");
      return;
    }

    // Response handling
    if (result.recordset.length === 0) {
      res.status(400).send("No data found");
      return;
    } else {
      res.status(200).json(result.recordsets[0][0]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { menu };
