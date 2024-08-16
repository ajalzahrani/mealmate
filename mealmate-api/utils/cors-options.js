const allowedOrigins = require("./allow-origins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  //   CrossOrigin: true,
  CrossOriginOpenerPolicy: "same-origin",
};

module.exports = corsOptions;
