const express = require("express");
const { AuthRouter } = require("./control/auth.controller");
const { createDbConnection } = require("./db");
const { validateToken } = require("./middleware/auth.middleware");

const API_SERVER = express();

//db connection
createDbConnection();

// PARSING INCOMING REQUEST BODY AS JSON
API_SERVER.use(express.json());

// inject routes
API_SERVER.use("/auth",validateToken,AuthRouter)



API_SERVER.listen(3000, "localhost", () => {
  console.log("server start");
});
