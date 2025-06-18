require("dotenv").config();
const http = require("http");
const app = require("./app");

//normalizePORT renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne

const normalizePORT = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePORT(process.env.PORT || "3000");
app.set("port", port);

//errorHandler gère les erreurs de serveur, comme les erreurs de port déjà utilisé ou de permissions
// Il affiche un message d'erreur approprié et arrête le processus si nécessaire.
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTP avec l'application Express
const server = http.createServer(app);

// Gestion des événements du serveur
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe" + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
