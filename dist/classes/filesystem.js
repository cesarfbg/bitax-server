"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    guardarArchivoTemporal(file) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar creación de carpetas
            const filePath = yield path_1.default.resolve(__dirname, '../uploads/files/');
            const existe = fs_1.default.existsSync(filePath);
            if (!existe) {
                yield fs_1.default.mkdirSync(filePath);
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
        });
    }
}
exports.default = FileSystem;
