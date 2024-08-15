const sql = require("mssql");
const { connection_config, hims_dev_connection } = require("../dbconnection");
const { logEvents } = require("../middleware/Log_Event");
const { convert_to_integer } = require("../utils/common");

const db_wrapper = async (query, database) => {
  // port number parameter validation

  let database_config =
    database === "hims" ? hims_dev_connection : connection_config;
  if (database_config.port !== undefined) {
    let port_number = convert_to_integer(database_config.port.toString());

    if (port_number !== 0) database_config.port = port_number;
    else return false;
  }

  try {
    // check if the connection is successful
    if (!(await sql.connect(database_config))) {
      console.log(
        "if database connection faild then uncomment port validation"
      );
      console.error("Database connection is not successful. 1");
      logEvents("Database connection is not successful.", "sql_query");
      await sql.close();
      return false;
    }
  } catch (error) {
    console.error("Database connection is not successful.", error);
    logEvents("Error while trying to connect to database", "sql_query");
    await sql.close();
    return false;
  }

  console.log("Query: ", query);

  try {
    // Execute the stored procedure
    const result = await sql.query(query);
    // Close the connection
    await sql.close();

    console.log("Query result: ", JSON.stringify(result));

    return result;
  } catch (error) {
    await sql.close();
    console.error("Error while executing query: ", error);
    logEvents("Query execution did not success", "sql_query");
    return false;
  }
};

const sql_query_fetch_patient_byMRN = async (mrn) => {
  //   const query = `exec SPPPAPI_VERIFY_PATIENT_BYMRN_v2 '${mrn}', '${phone}'`;
  const q = `EXEC Pr_NXG_FetchInPatientsAdv_perf_MODA_mealmate '${mrn}'`;
  return db_wrapper(q, "wipro");
};

const sql_query_fetch_patient_diet_byMRN = async (mrn) => {
  const q = `EXEC Pr_FetchWardWiseLatestDietPlanADV_v3 '${mrn}'`;
  return db_wrapper(q, "wipro");
};

const sql_query_fetch_mealMaster = async () => {
  const q = `EXEC PROC_FS_MealMaster_Select`;
  return db_wrapper(q, "hims");
};

const sql_query_insert_mealMaster = async (
  name,
  weight,
  calories,
  name2l,
  weight2l,
  calories2l
) => {
  const q = `EXEC PROC_FS_MealMaster_Insert '${name}', '${weight}', '${calories}', '${name2l}', '${weight2l}', '${calories2l}'`;
  return db_wrapper(q, "hims");
};

const sql_query_fetch_mealCategoryByTimeDayWeek = async (time, day, week) => {
  const q = `EXEC PROC_FS_MealCategory_selectBy_time_day_week '${parseInt(
    time
  )}', '${parseInt(day)}', '${parseInt(week)}'`;
  return db_wrapper(q, "hims");
};

const sql_query_insert_mealCategory = async (
  mealCategory,
  mealTimeId,
  dayTitleId,
  weekId
) => {
  const q = `EXEC PROC_FS_MealCategory_insert '${mealCategory}', '${mealTimeId}', '${dayTitleId}', '${weekId}'`;
  return db_wrapper(q, "hims");
};

const sql_query_insert_mealCategoryDetails = async (mealCategoryId, mealId) => {
  const q = `EXEC PROC_FS_MealCategoryDetail_insert ${mealCategoryId}, ${mealId}`;
  return db_wrapper(q, "hims");
};

const sql_query_insert_menuItem = async (
  category,
  mealID,
  mealTime,
  mealDay,
  mealWeek
) => {
  const q = `EXEC PROC_FS_FoodServiceMenu_Insert '${category}', ${mealID}, '${mealTime}', '${mealDay}', '${mealWeek}'`;
  return db_wrapper(q, "hims");
};

const sql_query_fetch_menuItemDay = async (
  mealTime,
  mealDay,
  mealWeek,
  viewBy
) => {
  const q = `EXEC PROC_FS_FoodServiceMenu_selectBy_time_day_week '${mealTime}', '${mealDay}', '${mealWeek}', '${viewBy}'`;
  return db_wrapper(q, "hims");
};

module.exports = {
  sql_query_fetch_patient_byMRN,
  sql_query_fetch_patient_diet_byMRN,
  sql_query_fetch_mealMaster,
  sql_query_insert_mealMaster,
  sql_query_insert_mealCategory,
  sql_query_insert_mealCategoryDetails,
  sql_query_fetch_mealCategoryByTimeDayWeek,
  sql_query_insert_menuItem,
  sql_query_fetch_menuItemDay,
};
