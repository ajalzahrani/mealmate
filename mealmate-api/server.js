require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middleware/Error_Handling");
const { logEvents } = require("./middleware/Log_Event");
const helmet = require("helmet");
const createError = require("http-errors");
const corsOptions = require("./utils/cors-options");
const { logger } = require("./middleware/Log_Event");

const app = express();
app.use(cors(corsOptions)); // Cross Origin Resource Sharing
app.use(bodyParser.json());
app.use(helmet()); // Using helmet
app.use(logger); // Custom middleware logger
app.use(express.json());

// Routers
app.use("/api", require("./routes"));

// Error handling middleware
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3001;

// Start the Express server
app.listen(PORT, () => {
  console.log(
    `Server listening at http://localhost:${PORT} for ${
      process.env.IS_DEVELOPMENT === "true" ? "Development" : "Production"
    }`
  );
});

// custom error reporter
app.use(errorHandler);
