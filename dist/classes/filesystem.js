"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file) {
        // Verificar creación de carpetas
        const filePath = path_1.default.resolve(__dirname, '../uploads/files/');
        const existe = fs_1.default.existsSync(filePath);
        if (!existe) {
            fs_1.default.mkdirSync(filePath);
        }
        return new Promise((resolve, reject) => {
            // Mover a carpeta Uploads
            file.mv(filePath + '/' + file.name, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = FileSystem;
