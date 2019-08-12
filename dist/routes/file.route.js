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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.resolve(__dirname, '../uploads/files/');
const pdf = require('pdf-parse');
const xl = require('excel4node');
const fileRoutes = express_1.Router();
const fileSystem = new filesystem_1.default();
const mime = require('mime');
const conceptosArr = [
    'Efectivo y equivalentes al efectivo',
    'Inversiones e instrumentos financieros derivados',
    'Cuentas, documentos y arrendamientos financieros por cobrar',
    'Inventarios',
    'Activos intangibles',
    'Activos biológicos',
    'Propiedades, planta y equipo, propiedades de inversión y ANCMV',
    'Otros activos',
    'Total patrimonio bruto',
    'Pasivos',
    'Total patrimonio líquido',
    'Ingresos brutos de actividades ordinarias',
    'Ingresos financieros',
    'Dividendos y/o participaciones recibidos o capitalizados por sociedades extranjeras (año 2016 y anteriores) o nacionales cualquier año',
    'Dividendos y/o participaciones recibidos por declarantes diferentes a sociedades nacionales, años 2017 y siguientes',
    'Dividendos y/o participaciones recibidos por personas naturales sin residencias fiscal (año 2016 y anteriores)',
    'Otros ingresos',
    'Total ingresos brutos',
    'Devoluciones, rebajas y descuentos en ventas',
    'Ingresos no constitutivos de renta ni ganancia ocasional',
    'Ingresos no constitutivos de dividendos y/o participaciones personas naturales sin residencia fiscal (año 2016 y anteriores)',
    'Total ingresos netos',
    'Costos',
    'Gastos de administración',
    'Gastos de distribución y ventas',
    'Gastos financieros',
    'Otros gastos y deducciones',
    'Total costos y gastos deducibles',
    'Inversiones efectuadas en el año',
    'Inversiones liquidadas de períodos gravables anteriores',
    'Renta Pasiva - ECE sin residencia fiscal en Colombia',
    'Renta líquida ordinaria del ejercicio sin casilla 47 y 48',
    'Pérdida líquida del ejercicio sin casilla 47 y 48',
    'Compensaciones',
    'Renta líquida sin casilla 47 y 48',
    'Renta presuntiva',
    'Renta exenta',
    'Rentas gravables',
    'Sin dividendos gravados al 5%, 35% y 33% de personas naturales sin residencia fisca',
    'Dividendos gravados a la tarifa del 5%',
    'Dividendos gravados a la tarifa del 35%',
    'Dividendos gravados, a la tarifa del 33% Personas Naturales sin residencia fiscal (año 2016 y anteriores)',
    'Ingresos por ganancias ocasionales',
    'Costos por ganancias ocasionales',
    'Ganancias ocasionales no gravadas y exentas',
    'Ganancias ocasionales gravables',
    'Impuesto sobre la renta líquida gravable',
    'Descuentos tributarios',
    'Impuesto neto de renta',
    'Sobretasa',
    'Impuesto de ganancias ocasionales',
    'Descuento por impuestos pagados en el exterior por ganancías ocasionales',
    'Impuesto dividendos gravados a la tarifa del 5%',
    'Impuesto dividendos gravados a la tarifa del 35%',
    'Impuesto dividendos gravados a la tarifa del 33%',
    'Total impuesto a cargo',
    'Valor inversion obras por impuestos hasta del 50% del valor de la casilla 88 (Modalidad de pago 1)',
    'Descuento efectivo inversión obras por impuestos (Modalidad de pago 2)',
    'Anticipo renta liquidado año gravable anterior',
    'Anticipo sobretasa liquidado año gravable anterior',
    'Saldo a favor año gravable anterior sin solicitud de devolución y/o compensación',
    'Autorretenciones',
    'Otras retenciones',
    'Total retenciones año gravable a declarar',
    'Anticipo renta para el año gravable siguiente',
    'Saldo a pagar por impuesto',
    'Sanciones',
    'Total saldo a pagar',
    'Total saldo a favor'
];
fileRoutes.post('/upload', (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo'
        });
    }
    const file = req.files.file;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se ha subido ningún archivo (BodyKey: file)'
        });
    }
    if (file.mimetype.includes('pdf')) {
        yield fileSystem.guardarImagenTemporal(file);
        const dataBuffer = fs_1.default.readFileSync(filePath + '/' + file.name);
        pdf(dataBuffer).then((data) => {
            let fileReaded = data.text;
            // Convertimos cada \n en ||| para que se haga más fácil la lectura y la búsqueda de índices
            const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
            // Buscamos la razón social
            let posicionRS = fileReadedOriginal.indexOf('|||104.');
            let stringRS = fileReadedOriginal.substring(posicionRS, fileReadedOriginal.length);
            let tms = 0;
            while (tms <= 3) {
                tms++;
                posicionRS = stringRS.indexOf('|||');
                stringRS = stringRS.substring(posicionRS + 3, stringRS.length);
            }
            const finalPosicionRS = stringRS.substring(3, stringRS.length).indexOf('|||');
            const razonSocial = stringRS.substring(3, finalPosicionRS + 3);
            // Capturamos el Año del archivo de RENTA
            let ano = file.name;
            const regex = /(\d+)/g;
            let arrAno = ano.match(regex) || ['No se pudo capturar el Año'];
            ano = arrAno[0];
            let i = 0;
            // Buscamos esta fila para trabajar a partir de ella, ya que esta cerca del 
            // valor que deseamos encontrar y es poco probable que cambie a futuro.
            let posicion = fileReadedOriginal.indexOf('|||104.');
            let fileTmp = fileReadedOriginal.substring(posicion, fileReadedOriginal.length);
            // Repetimos la búsqueda de ||| tantas veces como sea necesario para llegar a la posición 
            // del valor 33 del archivo de RENTA, y a partir de allí obtener los demás
            while (i <= 11) {
                i++;
                posicion = fileTmp.indexOf('|||');
                fileTmp = fileTmp.substring(posicion + 3, fileReadedOriginal.length);
            }
            // Ahora buscamos el final del tramo de texto que necesitamos
            i = 0;
            let posTemp = -1;
            while (i <= 68) {
                i++;
                posTemp = fileTmp.indexOf('|||', posTemp + 1);
            }
            // Guardamos la posición final hasta el valor que queremos obtener y guardamos la parte
            // necesaria en una variable para ser procesada luego.
            const posicionFinal = posTemp;
            const valoresPrincipalesRenta = fileTmp.substring(0, posicionFinal);
            // Separamos por ||| y creamos un arreglo con los valores
            let valoresArrRenta = valoresPrincipalesRenta.split('|||');
            // Vamos a crear un objeto cuyos atributos sean los números relacionados a los valores
            let indiceRentaObj = 33;
            let valoresRenta = {};
            valoresArrRenta.forEach(valor => {
                // Guardamos el valor convertido a número en su índice correspondiente
                valoresRenta[indiceRentaObj] = Number(valor.replace(/,/g, ''));
                indiceRentaObj++;
            });
            let wb = new xl.Workbook();
            const cellStyle = wb.createStyle({
                'alignment': {
                    'horizontal': ['center'],
                    'vertical': ['center'],
                    'wrapText': true
                }
            });
            // Creamos una hoja en el libro de excel
            const ws = wb.addWorksheet('Resultados', {
                'sheetFormat': {
                    'baseColWidth': 20,
                    'defaultColWidth': 20,
                    'defaultRowHeight': 36
                }
            });
            const headerStlye = wb.createStyle({
                'alignment': {
                    'horizontal': ['center'],
                    'vertical': ['center'],
                    'wrapText': true,
                },
                'font': {
                    'bold': true,
                    'size': 14
                }
            });
            // Llenamos las celdas
            ws.cell(1, 1).string('Concepto').style(headerStlye);
            ws.cell(1, 2).string('Campo').style(headerStlye);
            ws.cell(1, 3).string('Valor').style(headerStlye);
            ws.cell(1, 4).string('Año').style(headerStlye);
            ws.cell(1, 5).string('Razón Social').style(headerStlye);
            let idx = 2;
            for (let concepto in conceptosArr) {
                ws.cell(idx, 1).string(conceptosArr[concepto]).style(cellStyle);
                ws.cell(idx, 5).string(razonSocial).style(cellStyle);
                ws.cell(idx, 4).number(Number(ano)).style(cellStyle);
                idx++;
            }
            idx = 2;
            for (let att in valoresRenta) {
                ws.cell(idx, 2).number(Number(att)).style(cellStyle);
                ws.cell(idx, 3).number(valoresRenta[att]).style(cellStyle);
                idx++;
            }
            // Creamos el libro de excel
            ws.column(1).setWidth(70);
            ws.column(5).setWidth(30);
            wb.write('./dist/outputs/Renta-Estructurado.xlsx');
            const xlsFile = path_1.default.resolve(__dirname, '../outputs/Renta-Estructurado.xlsx');
            // // Configuramos headers
            var filename = path_1.default.basename(xlsFile);
            var mimetype = mime.lookup(xlsFile);
            // Enviamos la respuesta
            res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            res.setHeader('Content-type', mimetype);
            var filestream = fs_1.default.createReadStream(xlsFile);
            filestream.pipe(res);
        });
    }
    if (file.mimetype.includes('spreadsheet')) {
        return res.json({
            ok: true,
            mensaje: 'Archivo XLS recibido, falta procesar, hablar con el desarrollador backend xD',
            file: file.mimetype
        });
    }
    if (!file.mimetype.includes('spreadsheet') && !file.mimetype.includes('pdf')) {
        return res.status(400).json({
            ok: true,
            mensaje: 'Archivo recibido no se puede procesar, formato inválido',
            file: file.mimetype
        });
    }
}));
exports.default = fileRoutes;
