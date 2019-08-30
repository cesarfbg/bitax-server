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
const express_1 = require("express");
const filesystem_1 = __importDefault(require("../classes/filesystem"));
const bitaxpdf_1 = __importDefault(require("../classes/bitaxpdf"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdf = require('pdf-parse');
const fileRoutes = express_1.Router();
const fileSystem = new filesystem_1.default();
const bpdf = new bitaxpdf_1.default();
const uploadedFilePath = path_1.default.resolve(__dirname, '../uploads/files/');
fileRoutes.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
    // Validamos si no se ha subido ningún archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo'
        });
    }
    // Si no hay archivos con el BodyKey file enviamos un mensaje
    const file = req.files.file;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo (BodyKey: file)'
        });
    }
    // Verificamos si lo que recibimos es un PDF para ser procesado como tal
    if (file.mimetype.includes('pdf')) {
        // Guardamos la imagen recibida
        yield fileSystem.guardarArchivoTemporal(file);
        // Leemos como buffer la imagen guardada
        const dataBuffer = yield fs_1.default.readFileSync(uploadedFilePath + '/' + file.name);
        if (file.name.toLocaleLowerCase().includes('renta')) { // Verificamos si el archivo es de RENTA
            pdf(dataBuffer).then((data) => __awaiter(this, void 0, void 0, function* () {
                let ano = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if (Number.isInteger(Number(str))) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if (!ano) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = yield bpdf.leerRenta(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                yield bpdf.delay(2000);
                const filestream = yield fs_1.default.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            }));
        }
        else if (file.name.toLocaleLowerCase().includes('iva')) { // Verificamos si el archivo es de IVA
            pdf(dataBuffer).then((data) => __awaiter(this, void 0, void 0, function* () {
                let ano = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if (Number.isInteger(Number(str))) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if (!ano) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = yield bpdf.leerIva(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                yield bpdf.delay(2000);
                const filestream = yield fs_1.default.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            }));
        }
        else if (file.name.toLocaleLowerCase().includes('ica')) { // Verificamos si el archivo es de ICA
            pdf(dataBuffer).then((data) => __awaiter(this, void 0, void 0, function* () {
                let ano = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if (Number.isInteger(Number(str))) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if (!ano) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = yield bpdf.leerIca(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                yield bpdf.delay(2000);
                const filestream = yield fs_1.default.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            }));
        }
        else if (file.name.toLocaleLowerCase().includes('retencion')) { // Verificamos si el archivo es de RETENCIONES
            pdf(dataBuffer).then((data) => __awaiter(this, void 0, void 0, function* () {
                let ano = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if (Number.isInteger(Number(str))) {
                            ano = Number(str);
                        }
                    }
                }
                if (!ano) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = yield bpdf.leerRetenciones(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                yield bpdf.delay(1000);
                const filestream = fs_1.default.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            }));
        }
        else {
            res.json({
                ok: false,
                mensaje: 'No es un tipo de archivo que se pueda procesar, leer manual de carga de archivos BITAX'
            });
        }
    }
    // Si lo que recibimos no es ni un PDF ni un EXCEL se envia alerta
    if (!file.mimetype.includes('pdf')) {
        return res.status(400).json({
            ok: true,
            mensaje: 'Archivo recibido no se puede procesar, formato inválido',
            file: file.mimetype
        });
    }
}));
exports.default = fileRoutes;
