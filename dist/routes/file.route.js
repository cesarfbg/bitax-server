"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { FileUpload } from '../interfaces/file.interface';
// import FileSystem from '../classes/filesystem';
// import path from 'path';
// import fs from 'fs';
// const filePath = path.resolve( __dirname, '../uploads/files/');
// const pdf = require('pdf-parse');
const fileRoutes = express_1.Router();
// const fileSystem = new FileSystem();
fileRoutes.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Heroku funciona!'
    });
});
// fileRoutes.post('/upload', async ( req: any, res: Response ) => {
//     if ( !req.files ) {
//         return res.status(400).json({
//             ok: false,
//             mensaje: 'No se ha subido ningún archivo'
//         });
//     }
//     const file: FileUpload = req.files.file;
//     if ( !file ) {
//         return res.status(400).json({
//             ok: false,
//             mensaje: 'No se ha subido ningún archivo (BodyKey: file)'
//         });
//     }
//     if ( file.mimetype.includes('pdf') ) {
//         const guardado = await fileSystem.guardarImagenTemporal( file );
//         const dataBuffer = fs.readFileSync(filePath+'\\'+file.name);
//         pdf(dataBuffer).then( (data: any) => {
//             let fileReaded: string = data.text;
//             // Convertimos cada \n en ||| para que se haga más fácil la lectura y la búsqueda de índices
//             const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
//             let i = 0;
//             // Buscamos esta fila para trabajar a partir de ella, ya que esta cerca del 
//             // valor que deseamos encontrar y es poco probable que cambie a futuro.
//             let posicion = fileReadedOriginal.indexOf('|||104.');
//             let fileTmp = fileReadedOriginal.substring(posicion, fileReadedOriginal.length);
//             // Repetimos la búsqueda de ||| tantas veces como sea necesario para llegar a la posición 
//             // del valor 33 del archivo de RENTA, y a partir de allí obtener los demás
//             while( i <= 11 ) {
//                 i++;
//                 posicion = fileTmp.indexOf('|||');
//                 fileTmp = fileTmp.substring(posicion+3, fileReadedOriginal.length);
//             }
//             // Ahora buscamos el final del tramo de texto que necesitamos
//             i = 0;
//             let posTemp = -1;
//             while( i <= 68 ) {
//                 i++;
//                 posTemp = fileTmp.indexOf('|||', posTemp+1);
//             }
//             // Guardamos la posición final hasta el valor que queremos obtener y guardamos la parte
//             // necesaria en una variable para ser procesada luego.
//             const posicionFinal = posTemp;
//             const valoresPrincipalesRenta = fileTmp.substring(0, posicionFinal);
//             // Separamos por ||| y creamos un arreglo con los valores
//             let valoresArrRenta = valoresPrincipalesRenta.split('|||');
//             // Vamos a crear un objeto cuyos atributos sean los números relacionados a los valores
//             let indiceRentaObj = 33;
//             let valoresRenta = <any>{};
//             valoresArrRenta.forEach( valor => {
//                 // Guardamos el valor convertido a número en su índice correspondiente
//                 valoresRenta[indiceRentaObj] = Number(valor.replace(/,/g, ''));
//                 indiceRentaObj++;
//             });
//             return res.json({
//                 ok: true,
//                 mensaje: 'Procesando archivo',
//                 valoresRenta
//             });
//         });
//     }
//     if ( file.mimetype.includes('spreadsheet') ) {
//         return res.json({
//             ok: true,
//             mensaje: 'Archivo XLS recibido, falta procesar, hablar con el desarrollador backend xD',
//             file: file.mimetype
//         });
//     }
//     if ( !file.mimetype.includes('spreadsheet') && !file.mimetype.includes('pdf')) {
//         return res.status(400).json({
//             ok: true,
//             mensaje: 'Archivo recibido no se puede procesar, formato inválido',
//             file: file.mimetype
//         });
//     }
// });
exports.default = fileRoutes;
