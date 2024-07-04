const sql = require("mssql");
const { connection_config } = require("../dbconnection");
const { logEvents } = require("../middleware/Log_Event");
const { convert_to_integer } = require("../utils/common");

const db_wrapper = async (query) => {
  // port number parameter validation

  if (connection_config.port !== undefined) {
    let port_number = convert_to_integer(connection_config.port.toString());
    if (port_number !== 0) connection_config.port = port_number;
    else return false;
  }

  try {
    // check if the connection is successful
    if (!(await sql.connect(connection_config))) {
      console.log(
        "if database connection faild then uncomment port validation"
      );
      console.error("Database connection is not successful.");
      logEvents("Database connection is not successful.", "sql_query");
      return false;
    }
  } catch {
    console.error("Database connection is not successful.");
    logEvents("Error while trying to connect to database", "sql_query");
    return false;
  }

  try {
    // Execute the stored procedure
    const result = await sql.query(query);
    // Close the connection
    await sql.close();
    return result;
  } catch {
    await sql.close();
    logEvents("Query execution did not success", "sql_query");
    return false;
  }
};

const sql_query_fetch_patient_byMRN = async (mrn) => {
  //   const query = `exec SPPPAPI_VERIFY_PATIENT_BYMRN_v2 '${mrn}', '${phone}'`;
  const q = `EXEC Pr_NXG_FetchInPatientsAdv_perf_MODA_mealmate '${mrn}'`;
  return db_wrapper(q);
};

const sql_query_fetch_patient_diet_byMRN = async (mrn) => {
  const q = `EXEC Pr_FetchWardWiseLatestDietPlanADV_v2 '${mrn}'`;
  return db_wrapper(q);
};

module.exports = {
  sql_query_fetch_patient_byMRN,
  sql_query_fetch_patient_diet_byMRN,
};
