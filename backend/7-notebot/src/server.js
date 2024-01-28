import express from "express";
import http from "http";
import dotenv from "dotenv";
import debugLib from "debug";
import bodyParser from "body-parser";
import path from "path";
import { Eureka } from "eureka-js-client";

dotenv.config();
const env = process.env.NODE_ENV || "production";
const app = express();
const debug = debugLib("7-notebot:src/server");
const db = require("./models");

global.__basedir = __dirname;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, "public")));


// Get port from environment and store in Express
const port = normalizePort(process.env.PORT || "8007");
const PORT = process.env.PORT || 8007;

const hostName = normalizePort(process.env.HOSTNAME || "backend-7-notebot");
app.set("port", port);

// Create connection to MongoDB
db.mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("**** Successfully connected to MongoDB ****");
  })
  .catch((err) => {
    console.error("!!!! Error connecting to MongoDB !!!!", err);
    process.exit();
  });

// Create HTTP server
const server = http.createServer(app);

// Routes
let apiURL = "/api/notebot";
// let apiURL = "";
/***************** START: IMPORT ROUTES *****************
 * @documentation
 * Import the routes from the routes folder. The routes
 * folder contains all the routes for the application.
 * Create a new variable such as 'userRoutes' and assign
 * the imported routes. Then use the routes by passing
 * the apiURL and the routes using the app.use() method.
 */

const userRoutes = require("./routes/user.routes");
const noteRoutes = require("./routes/note.Routes");
const widgetsRoutes = require("./routes/widgets");
const sectionsRoutes = require("./routes/sections");
const coursesRoutes = require("./routes/courses");

app.use(apiURL, userRoutes);
app.use(apiURL, noteRoutes);
app.use(apiURL, widgetsRoutes);
app.use(apiURL, sectionsRoutes);
app.use(apiURL, coursesRoutes);

// Add more routes here

/***************** END: IMPORT ROUTES *****************/

const os = require('os');

// Function to get the local IP address
function getIPAddress() {
  const ifaces = os.networkInterfaces();
  let ipAddress = '127.0.0.1';

  Object.keys(ifaces).forEach(ifname => {
    ifaces[ifname].forEach(iface => {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address;
      }
    });
  });

  return ipAddress;
}

// Configuration for Eureka client
const client = new Eureka({
  instance: {
    app: "ELAS-NOTEBOT",
    hostName: os.hostname(),
    ipAddr: getIPAddress(),
    port: {
      '$': PORT,
      '@enabled': 'true',
    },
    statusPageUrl: `http://${hostName}:${PORT}`,
    vipAddress: "ELAS-NOTEBOT",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    // Eureka server host / port / servicePath
    host: process.env.EUREKA_HOST_NAME,
    port: process.env.EUREKA_PORT,
    servicePath: "/eureka/apps/",
  },
});

// Connect to Eureka server
client.start((error) => {
  console.log(error || "**** Notebot started and registered with Eureka ****");
});

// Listen on provided port, on all network interfaces
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Exit handler
function exitHandler(options, exitCode) {
  if (options.exit) {
    client.stop(function (error) {
      process.exit();
    });
  }
}

// Event listener for process exit events
process.on("exit", exitHandler.bind(null, { cleanup: true }));
process.on("SIGINT", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

// Normalize a port into a number, string, or false
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
  if (error.syscall !== "listen") throw error;
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Starting " + env.trim() + " server on port " + port);
  debug("Listening on " + bind);
}


module.exports = server;
