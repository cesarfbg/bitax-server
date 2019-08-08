import { FileUpload } from '../interfaces/file.interface';
import path from 'path';
import fs from 'fs';

export default class FileSystem {

    constructor() {}

    guardarImagenTemporal( file: FileUpload ){
        // Verificar creación de carpetas
        const filePath = path.resolve( __dirname, '../uploads/files/');
        const existe = fs.existsSync(filePath);
        if ( !existe ) {
            fs.mkdirSync( filePath );
        }
        return new Promise( (resolve, reject) => {
            // Mover a carpeta Uploads
            file.mv( filePath+'/'+file.name, (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            } );
        });
    }
}