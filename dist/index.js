"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const file_route_1 = __importDefault(require("./routes/file.route"));
// import bodyParser from "body-parser";
// import fileUpload from "express-fileupload";
const server = new server_1.default();
// BodyParser
// server.app.use(bodyParser.urlencoded({extended: true}));
// server.app.use(bodyParser.json());
// FileUpload
// server.app.use(fileUpload());
// Rutas
server.app.use('/file', file_route_1.default);
// Levantar Express
server.start(() => {
    console.log(`Servidor Corriendo en Puerto ${server.port}`);
});
