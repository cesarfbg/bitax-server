import Server from "./classes/server";
import fileRoutes from "./routes/file.route";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

const server = new Server();

// Configurar CORS
server.app.use( cors({ origin: true, credentials: true }) );

// BodyParser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload());

// Rutas
server.app.use( '/file', fileRoutes );

// Levantar Express
server.start( () => {
    console.log(`Servidor Corriendo en Puerto ${server.port}`);
});