"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const file_route_1 = __importDefault(require("./routes/file.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
// Configurar CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// BodyParser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// FileUpload
server.app.use(express_fileupload_1.default());
// Rutas
server.app.use('/file', file_route_1.default);
// Levantar Express
server.start(() => {
    console.log(`Servidor Corriendo en Puerto ${server.port}`);
});
