import { Router, Response } from 'express';
import { FileUpload } from '../interfaces/file.interface';
import FileSystem from '../classes/filesystem';
import bitaxpdf from '../classes/bitaxpdf';
import path from 'path';
import fs from 'fs';

const pdf = require('pdf-parse');
const fileRoutes = Router();
const fileSystem = new FileSystem();
const bpdf = new bitaxpdf();
const uploadedFilePath = path.resolve( __dirname, '../uploads/files/');

fileRoutes.post('/upload', async ( req: any, res: Response ) => {
    
    // Validamos si no se ha subido ningún archivo
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo'
        });
    }

    // Si no hay archivos con el BodyKey file enviamos un mensaje
    const file: FileUpload = req.files.file;
    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo (BodyKey: file)'
        });
    }

    // Verificamos si lo que recibimos es un PDF para ser procesado como tal
    if ( file.mimetype.includes('pdf') ) {

        // Guardamos la imagen recibida
        await fileSystem.guardarImagenTemporal( file );

        // Leemos como buffer la imagen guardada
        const dataBuffer = fs.readFileSync(uploadedFilePath+'/'+file.name);

        if ( file.name.toLocaleLowerCase().includes('renta') ) {
            // Procesamos como PDF - Renta
            pdf(dataBuffer).then( (data: any) => {
                // Enviamos el archivo y recibimos la respuesta
                const respuesta = bpdf.leerRenta(data, file);
                // Enviamos la respuesta
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                var filestream = fs.createReadStream(respuesta.xlsFile);
                filestream.pipe(res)
            });
        } else if ( file.name.toLocaleLowerCase().includes('iva') ) {
            pdf(dataBuffer).then( (data: any) => {
                // Enviamos el archivo y recibimos la respuesta
                const respuesta = bpdf.leerIva(data, file);

                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                var filestream = fs.createReadStream(respuesta.xlsFile);
                filestream.pipe(res)
            });
        } else if ( file.name.toLocaleLowerCase().includes('ica') ) {
            res.json({
                ok: true,
                mensaje: 'Se procesará el archivo de ICA'
            });
        } else if ( file.name.toLocaleLowerCase().includes('retenciones') ) {
            res.json({
                ok: true,
                mensaje: 'Se procesará el archivo de RETENCIONES'
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'No es un tipo de archivo que se pueda procesar, leer manual de carga de archivos BITAX'
            });
        }
    }

    // Verificamos si lo que recibimos es un EXCEL para ser procesado como tal
    if ( file.mimetype.includes('spreadsheet') ) {
        return res.json({
            ok: true,
            mensaje: 'Archivo XLS recibido.',
            file: file.mimetype
        });
    }

    // Si lo que recibimos no es ni un PDF ni un EXCEL se envia alerta
    if ( !file.mimetype.includes('spreadsheet') && !file.mimetype.includes('pdf')) {
        return res.status(400).json({
            ok: true,
            mensaje: 'Archivo recibido no se puede procesar, formato inválido',
            file: file.mimetype
        });
    }

});

export default fileRoutes;