// export type db_connection_string_type = {
//   server?: string,
//   port?: string | number,
//   user?: string,
//   password?: string,
//   database?: string,
//   options?: {
//     encrypt: Boolean,
//     trustServerCertificate: Boolean,
//   },
// };

let connection_config = {};

if (process.env.IS_DEVELOPMENT) {
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

module.exports = { connection_config };
