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
        await fileSystem.guardarArchivoTemporal( file );

        // Leemos como buffer la imagen guardada
        const dataBuffer = await fs.readFileSync(uploadedFilePath+'/'+file.name);

        if ( file.name.toLocaleLowerCase().includes('renta') ) { // Verificamos si el archivo es de RENTA
            pdf(dataBuffer).then( async (data: any) => {
                let ano: any = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if ( Number.isInteger( Number(str) ) ) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if ( !ano ) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = await bpdf.leerRenta(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                await bpdf.delay(2000);
                const filestream = await fs.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            });
        } else if ( file.name.toLocaleLowerCase().includes('iva') ) { // Verificamos si el archivo es de IVA
            pdf(dataBuffer).then( async (data: any) => {
                let ano: any = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if ( Number.isInteger( Number(str) ) ) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if ( !ano ) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = await bpdf.leerIva(data, ano, file.name);
                data.
                res.json({
                    ok: true,
                    respuesta
                });
                // res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                // res.setHeader('Content-type', respuesta.mimetype);
                await bpdf.delay(2000);
                // const filestream = await fs.createReadStream(respuesta.xlsFile);
                // filestream.pipe(res);
            });
        } else if ( file.name.toLocaleLowerCase().includes('ica') ) { // Verificamos si el archivo es de ICA
            pdf(dataBuffer).then( async (data: any) => {
                let ano: any = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if ( Number.isInteger( Number(str) ) ) {
                            ano = Number(str);
                            break;
                        }
                    }
                }
                if ( !ano ) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = await bpdf.leerIca(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                await bpdf.delay(2000);
                const filestream = await fs.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            });
        } else if ( file.name.toLocaleLowerCase().includes('retencion') ) { // Verificamos si el archivo es de RETENCIONES
            pdf(dataBuffer).then( async (data: any) => {
                let ano: any = file.name.split(' ');
                for (let str of ano) {
                    str = str.replace('.pdf', '');
                    if (str.length === 4) {
                        if ( Number.isInteger( Number(str) ) ) {
                            ano = Number(str);
                        }
                    }
                }
                if ( !ano ) {
                    ano = '(No se pudo capturar el año)';
                }
                const respuesta = await bpdf.leerRetenciones(data, ano, file.name);
                res.setHeader('Content-disposition', 'attachment; filename=' + respuesta.filename);
                res.setHeader('Content-type', respuesta.mimetype);
                await bpdf.delay(1000);
                const filestream = fs.createReadStream(respuesta.xlsFile);
                filestream.pipe(res);
            });
        } else {
            res.json({
                ok: false,
                mensaje: 'No es un tipo de archivo que se pueda procesar, leer manual de carga de archivos BITAX'
            });
        }
    }

    // Si lo que recibimos no es ni un PDF ni un EXCEL se envia alerta
    if ( !file.mimetype.includes('pdf')) {
        return res.status(400).json({
            ok: true,
            mensaje: 'Archivo recibido no se puede procesar, formato inválido',
            file: file.mimetype
        });
    }

});

export default fileRoutes;