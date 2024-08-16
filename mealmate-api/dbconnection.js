let connection_config = {};
let hims_dev_connection = {};

let is_development = process.env.IS_DEVELOPMENT;
if (is_development === "true") {
  connection_config = {
    server: process.env.DEV_SERVER,
    port: process.env.DEV_PORT, // Replace this with the appropriate port for your MySQL server
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    options: {
      encrypt: false, // For Azure SQL Database, set to true
      trustServerCertificate: false, // For Azure SQL Database, set to true
    },
  };
} else {
  connection_config = {
    server: process.env.PRO_SERVER,
    port: process.env.PRO_PORT, // Replace this with the appropriate port for your MySQL server
    user: process.env.PRO_USER,
    password: process.env.PRO_PASSWORD,
    database: process.env.PRO_DATABASE,
    options: {
      encrypt: false, // For Azure SQL Database, set to true
      trustServerCertificate: false, // For Azure SQL Database, set to true
    },
  };
}

hims_dev_connection = {
  server: process.env.CUS_SERVER,
  user: process.env.CUS_USER,
  password: process.env.CUS_PASSWORD,
  database: process.env.CUS_DATABASE,
  port: process.env.CUS_PORT,
  options: {
    encrypt: false, // For Azure SQL Database, set to true
    trustServerCertificate: false, // For Azure SQL Database, set to true
  },
};

console.log({ connection_config, hims_dev_connection });
module.exports = { connection_config, hims_dev_connection };
