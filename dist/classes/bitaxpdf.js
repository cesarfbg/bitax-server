"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const xl = require('excel4node');
const mime = require('mime');
class bitaxpdf {
    leerRenta(data, anoTitulo, fileName) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Creamos el Libro de Excel
        let wb = new xl.Workbook();
        const cellStyle = wb.createStyle({
            'alignment': {
                'horizontal': ['center'],
                'vertical': ['center'],
                'wrapText': true
            }
        });
        // Creamos una hoja en el libro de excel con su respectivo formato
        const ws = wb.addWorksheet('Resultados', {
            'sheetFormat': {
                'baseColWidth': 20,
                'defaultColWidth': 20,
                'defaultRowHeight': 50
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
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        if (anoTitulo === 2019) {
            ws.cell(2, 1).string('Los archivos pdf de RENTA del año ' + anoTitulo + ' no se pueden procesar, contacte al desarrollador').style(headerStlye);
        }
        else if (anoTitulo === 2018) {
            // Capturamos el Año Gravable
            const ano = anoTitulo;
            // Capturamos la Razón Social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 183, 1);
            // Capturamos los Valores
            let valoresIniciales = this.separarPegados(this.obtenerFila(fileReadedOriginal, 189, 1));
            const valoresArr = valoresIniciales;
            const valoresRestantes = this.obtenerFila(fileReadedOriginal, 190, 71).split('|||');
            valoresArr.push(...valoresRestantes);
            // Llenamos las celdas con la data
            for (let concepto in conceptosRentaArr2018) {
                ws.cell(Number(concepto) + 2, 1).string(conceptosRentaArr2018[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 2, 2).number(Number(concepto) + 30).style(cellStyle);
                ws.cell(Number(concepto) + 2, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 2, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 2, 5).string(razonSocial).style(cellStyle);
            }
        }
        else if (anoTitulo === 2017) {
            // Capturamos el Año Gravable
            const ano = anoTitulo;
            // Capturamos la Razón Social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 188, 1);
            // Capturamos los Valores
            let valoresIniciales = this.separarPegados(this.obtenerFila(fileReadedOriginal, 194, 1));
            const valoresArr = valoresIniciales;
            const valoresRestantes = this.obtenerFila(fileReadedOriginal, 195, 71).split('|||');
            valoresArr.push(...valoresRestantes);
            // Llenamos las celdas con la data
            for (let concepto in conceptosRentaArr2017) {
                ws.cell(Number(concepto) + 2, 1).string(conceptosRentaArr2017[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 2, 2).number(Number(concepto) + 30).style(cellStyle);
                ws.cell(Number(concepto) + 2, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 2, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 2, 5).string(razonSocial).style(cellStyle);
            }
        }
        else {
            ws.cell(2, 1).string('Los archivos del año ' + anoTitulo + ' no se pueden procesar, contacte al desarrollador').style(headerStlye);
        }
        // Creamos el libro de excel
        let name = fileName.split('.');
        name.pop();
        name = name.join('');
        const time = new Date().getTime();
        wb.write(path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx'));
        const xlsFile = path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx');
        const filename = path_1.default.basename(xlsFile);
        const mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerRetenciones(data, anoTitulo, fileName) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Creamos el Libro de Excel
        let wb = new xl.Workbook();
        const cellStyle = wb.createStyle({
            'alignment': {
                'horizontal': ['center'],
                'vertical': ['center'],
                'wrapText': true
            }
        });
        // Creamos una hoja en el libro de excel con su respectivo formato
        const ws = wb.addWorksheet('Resultados', {
            'sheetFormat': {
                'baseColWidth': 20,
                'defaultColWidth': 20,
                'defaultRowHeight': 50
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
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        if (anoTitulo === 2019) {
            // Capturamos el Año Gravable
            const ano = this.obtenerFila(fileReadedOriginal, 137, 1);
            // Capturamos el Período
            const periodo = this.obtenerFila(fileReadedOriginal, 138, 1);
            // Capturamos la Tarifa
            const tarifa = this.obtenerFila(fileReadedOriginal, 208, 1).substring(4).replace(' ', '');
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 142, 1);
            // Capturamos los valores
            const valoresArr = this.obtenerFila(fileReadedOriginal, 146, 61).split('|||');
            // Llenamos manualmente las primeras filas
            ws.cell(2, 1).string('Período').style(cellStyle);
            ws.cell(2, 2).number(Number(3)).style(cellStyle);
            ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosRetencionesArr2019) {
                ws.cell(Number(concepto) + 3, 1).string(conceptosRetencionesArr2019[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 27).style(cellStyle);
                ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
            }
            ws.cell(64, 1).string('Tarifa').style(cellStyle);
            ws.cell(64, 2).number(Number(91)).style(cellStyle);
            ws.cell(64, 3).string(tarifa).style(cellStyle);
            ws.cell(64, 4).number(Number(ano)).style(cellStyle);
            ws.cell(64, 5).string(razonSocial).style(cellStyle);
        }
        else if (anoTitulo === 2018) {
            // Capturamos el Año Gravable
            const ano = this.obtenerFila(fileReadedOriginal, 136, 1);
            // Capturamos el Período
            const periodo = this.obtenerFila(fileReadedOriginal, 137, 1).replace(' ', '');
            // Capturamos la Tarifa
            const tarifa = this.obtenerFila(fileReadedOriginal, 204, 1).substring(4).replace(' ', '');
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 141, 1);
            // Capturamos los valores
            const valoresArr = this.obtenerFila(fileReadedOriginal, 145, 58).split('|||');
            // Llenamos manualmente las primeras filas
            ws.cell(2, 1).string('Período').style(cellStyle);
            ws.cell(2, 2).number(Number(3)).style(cellStyle);
            ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosRetencionesArr2018) {
                ws.cell(Number(concepto) + 3, 1).string(conceptosRetencionesArr2018[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 27).style(cellStyle);
                ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
            }
            ws.cell(61, 1).string('Tarifa').style(cellStyle);
            ws.cell(61, 2).number(Number(91)).style(cellStyle);
            ws.cell(61, 3).string(tarifa).style(cellStyle);
            ws.cell(61, 4).number(Number(ano)).style(cellStyle);
            ws.cell(61, 5).string(razonSocial).style(cellStyle);
        }
        else if (anoTitulo === 2017) {
            // Capturamos el Año Gravable
            const ano = this.obtenerFila(fileReadedOriginal, 136, 1);
            // Capturamos el Período
            const periodo = this.obtenerFila(fileReadedOriginal, 137, 1).replace(' ', '');
            // Capturamos la Tarifa
            const tarifa = this.obtenerFila(fileReadedOriginal, 204, 1).substring(4).replace(' ', '');
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 141, 1);
            // Capturamos los valores
            const valoresArr = this.obtenerFila(fileReadedOriginal, 145, 58).split('|||');
            // Llenamos manualmente las primeras filas
            ws.cell(2, 1).string('Período').style(cellStyle);
            ws.cell(2, 2).number(Number(3)).style(cellStyle);
            ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosRetencionesArr2017) {
                ws.cell(Number(concepto) + 3, 1).string(conceptosRetencionesArr2017[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 27).style(cellStyle);
                ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
            }
            ws.cell(61, 1).string('Tarifa').style(cellStyle);
            ws.cell(61, 2).number(Number(91)).style(cellStyle);
            ws.cell(61, 3).string(tarifa).style(cellStyle);
            ws.cell(61, 4).number(Number(ano)).style(cellStyle);
            ws.cell(61, 5).string(razonSocial).style(cellStyle);
        }
        else {
            ws.cell(2, 1).string('Los archivos del año ' + anoTitulo + ' no se pueden procesar, contacte al desarrollador').style(headerStlye);
        }
        // Creamos el libro de excel
        let name = fileName.split('.');
        name.pop();
        name = name.join('');
        const time = new Date().getTime();
        wb.write(path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx'));
        const xlsFile = path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx');
        const filename = path_1.default.basename(xlsFile);
        const mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerIva(data, anoTitulo, fileName) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Creamos el Libro de Excel
        let wb = new xl.Workbook();
        const cellStyle = wb.createStyle({
            'alignment': {
                'horizontal': ['center'],
                'vertical': ['center'],
                'wrapText': true
            }
        });
        // Creamos una hoja en el libro de excel con su respectivo formato
        const ws = wb.addWorksheet('Resultados', {
            'sheetFormat': {
                'baseColWidth': 20,
                'defaultColWidth': 20,
                'defaultRowHeight': 50
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
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        if (anoTitulo === 2019) {
            // Capturamos el Año Gravable
            const ano = this.obtenerFila(fileReadedOriginal, 209, 1) || anoTitulo;
            // Capturamos el Período
            const periodo = this.obtenerFila(fileReadedOriginal, 210, 1).replace(' ', '');
            // Capturamos la Periodicidad
            const periodicidad = this.obtenerFila(fileReadedOriginal, 216, 1);
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 214, 1);
            // Capturamos los valores
            const valoresArr = this.obtenerFila(fileReadedOriginal, 217, 74).split('|||');
            // Llenamos manualmente el Período
            ws.cell(2, 1).string('Período').style(cellStyle);
            ws.cell(2, 2).number(Number(3)).style(cellStyle);
            ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos manualmente la Periodicidad
            ws.cell(3, 1).string('Periodicidad de la declaración').style(cellStyle);
            ws.cell(3, 2).number(Number(24)).style(cellStyle);
            ws.cell(3, 3).string(periodicidad).style(cellStyle);
            ws.cell(3, 4).number(Number(ano)).style(cellStyle);
            ws.cell(3, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosIvaArr2019) {
                ws.cell(Number(concepto) + 4, 1).string(conceptosIvaArr2019[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 4, 2).number(Number(concepto) + 27).style(cellStyle);
                ws.cell(Number(concepto) + 4, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 4, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 4, 5).string(razonSocial).style(cellStyle);
            }
        }
        else if (anoTitulo === 2018 || anoTitulo === 2017) {
            // Capturamos el Año Gravable
            const ano = this.obtenerFila(fileReadedOriginal, 199, 1) || anoTitulo;
            // Capturamos el Período
            const periodo = this.obtenerFila(fileReadedOriginal, 200, 1).replace(' ', '');
            // Capturamos la Periodicidad
            let periodicidad = this.obtenerFila(fileReadedOriginal, 206, 1);
            if (periodicidad === 'X') {
                periodicidad = 'Cuatrimestral';
            }
            else {
                periodicidad = 'No se pudo capturar, contactar al desarrollador.';
            }
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 204, 1);
            // Capturamos los valores
            const valoresArr = this.obtenerFila(fileReadedOriginal, 208, 65).split('|||');
            // Llenamos manualmente el Período
            ws.cell(2, 1).string('Período').style(cellStyle);
            ws.cell(2, 2).number(Number(3)).style(cellStyle);
            ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos manualmente la Periodicidad
            ws.cell(3, 1).string('Periodicidad de la declaración').style(cellStyle);
            ws.cell(3, 2).number(Number(24)).style(cellStyle);
            ws.cell(3, 3).string(periodicidad).style(cellStyle);
            ws.cell(3, 4).number(Number(ano)).style(cellStyle);
            ws.cell(3, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosIvaArr2018y2017) {
                ws.cell(Number(concepto) + 4, 1).string(conceptosIvaArr2018y2017[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 4, 2).number(Number(concepto) + 27).style(cellStyle);
                ws.cell(Number(concepto) + 4, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 4, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 4, 5).string(razonSocial).style(cellStyle);
            }
        }
        else {
            ws.cell(2, 1).string('Los archivos del año ' + anoTitulo + ' no se pueden procesar, contacte al desarrollador').style(headerStlye);
        }
        // Creamos el libro de excel
        let name = fileName.split('.');
        name.pop();
        name = name.join('');
        const time = new Date().getTime();
        wb.write(path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx'));
        const xlsFile = path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx');
        const filename = path_1.default.basename(xlsFile);
        const mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerIca(data, anoTitulo, fileName) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Creamos el Libro de Excel
        let wb = new xl.Workbook();
        const cellStyle = wb.createStyle({
            'alignment': {
                'horizontal': ['center'],
                'vertical': ['center'],
                'wrapText': true
            }
        });
        // Creamos una hoja en el libro de excel con su respectivo formato
        const ws = wb.addWorksheet('Resultados', {
            'sheetFormat': {
                'baseColWidth': 20,
                'defaultColWidth': 20,
                'defaultRowHeight': 50
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
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        if (anoTitulo === 2019) {
            // Capturamos el Año Gravable
            const ano = anoTitulo;
            // Capturamos el Período
            let bimestreOAnual = this.obtenerFila(fileReadedOriginal, 96, 1);
            if (bimestreOAnual === 'X') {
                bimestreOAnual = 'Anual';
            }
            else {
                bimestreOAnual = 'Bimestral';
            }
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 14, 1);
            // Capturamos los valores
            let valoresArr = this.obtenerFila(fileReadedOriginal, 16, 4).split('|||');
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 174, 4).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 39, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 30, 1).split('|||'));
            valoresArr.push(''); // kW Campo 18 sin capturar
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 178, 1).split('|||')); // IMPUESTO LEY
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 30, 3).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 179, 2).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 33, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 180, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 34, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 181, 3).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 20, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 208, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 38, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 184, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 67, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 185, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 70, 2).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 73, 2).split('|||'));
            // Llenamos manualmente las primeras filas
            ws.cell(2, 1).string('Bimestre o Período Anual').style(cellStyle);
            ws.cell(2, 2).string('N/A').style(cellStyle);
            ws.cell(2, 3).string(bimestreOAnual).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosIcaArr2019) {
                ws.cell(Number(concepto) + 3, 1).string(conceptosIcaArr2019[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 8).style(cellStyle);
                ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
            }
        }
        else if (anoTitulo === 2018) {
            // Capturamos el Año Gravable
            const ano = anoTitulo;
            // Capturamos el Período
            let bimestreOAnual = this.obtenerFila(fileReadedOriginal, 129, 1);
            if (bimestreOAnual === 'X') {
                bimestreOAnual = 'Anual';
            }
            else {
                bimestreOAnual = 'Bimestral';
            }
            // Capturamos la razón social
            const razonSocial = this.obtenerFila(fileReadedOriginal, 35, 1);
            // Capturamos los valores
            let valoresArr = this.obtenerFila(fileReadedOriginal, 38, 4).split('|||');
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 47, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 71, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 58, 5).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 41, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 70, 1).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 99, 1).replace('22.VALOR A PAGARVP', '').split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 104, 2).split('|||'));
            valoresArr.push(...this.obtenerFila(fileReadedOriginal, 112, 2).split('|||'));
            // Llenamos manualmente las primeras filas
            ws.cell(2, 1).string('Bimestre o Período Anual').style(cellStyle);
            ws.cell(2, 2).string('N/A').style(cellStyle);
            ws.cell(2, 3).string(bimestreOAnual).style(cellStyle);
            ws.cell(2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(2, 5).string(razonSocial).style(cellStyle);
            // Llenamos las celdas con la data
            for (let concepto in conceptosIcaArr2018) {
                ws.cell(Number(concepto) + 3, 1).string(conceptosIcaArr2018[concepto]).style(cellStyle);
                ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 9).style(cellStyle);
                ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
                ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
                ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
            }
        }
        else {
            ws.cell(2, 1).string('Los archivos del año ' + anoTitulo + ' no se pueden procesar, contacte al desarrollador').style(headerStlye);
        }
        // Creamos el libro de excel
        let name = fileName.split('.');
        name.pop();
        name = name.join('');
        const time = new Date().getTime();
        wb.write(path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx'));
        const xlsFile = path_1.default.resolve(__dirname, '../../dist/outputs/' + name + '-' + time + '.xlsx');
        const filename = path_1.default.basename(xlsFile);
        const mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    obtenerFila(archivo, fila, cantidadDeLineas) {
        let posicionInicial = archivo.indexOf('|||');
        for (let i = 1; i < fila; i++) {
            posicionInicial = archivo.indexOf('|||', posicionInicial + 3);
        }
        let posicionFinal = posicionInicial;
        for (let i = 1; i <= cantidadDeLineas; i++) {
            posicionFinal = archivo.indexOf('|||', posicionFinal + 3);
        }
        return archivo.substring(posicionInicial + 3, posicionFinal);
    }
    separarPegados(valoresIniciales) {
        let arrInitValues = [];
        let posicionFinalNumero = 0;
        let counter = 0;
        for (let i = 0; i < valoresIniciales.length; i++) {
            if (!isNaN(Number(valoresIniciales[i]))) {
                counter++;
            }
            else {
                counter = 0;
            }
            if (counter >= 4) {
                posicionFinalNumero = i;
                break;
            }
        }
        arrInitValues.push(valoresIniciales.substring(0, posicionFinalNumero));
        valoresIniciales = valoresIniciales.substring(posicionFinalNumero, valoresIniciales.length);
        posicionFinalNumero = 0;
        counter = 0;
        for (let i = 0; i < valoresIniciales.length; i++) {
            if (!isNaN(Number(valoresIniciales[i]))) {
                counter++;
            }
            else {
                counter = 0;
            }
            if (counter >= 4) {
                posicionFinalNumero = i;
                break;
            }
        }
        arrInitValues.push(valoresIniciales.substring(0, posicionFinalNumero));
        arrInitValues.push(valoresIniciales.substring(posicionFinalNumero, valoresIniciales.length));
        return arrInitValues;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.default = bitaxpdf;
const conceptosRetencionesArr2019 = [
    'Rentas de trabajo (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de pensiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rendimientos financieros e intereses (Base sujeta a retención para pagos o abonos en cuenta)',
    'Arrendamientos (Muebles e inmuebles) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Regalías y explotación de la propiedad intelectual (Base sujeta a retención para pagos o abonos en cuenta)',
    'Dividendos y participaciones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Compras (Base sujeta a retención para pagos o abonos en cuenta)',
    'Transacciones con tarjetas débito y crédito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Contratos de construcción (Base sujeta a retención para pagos o abonos en cuenta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Loterías, rifas, apuestas y similares (Base sujeta a retención para pagos o abonos en cuenta)',
    'Otros pagos sujetos a retención (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Contribuyentes exonerados de aportes (art. 114-1 E.T.) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Ventas (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Rendimientos financieros (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Pagos mensuales provisionales de carácter voluntario (hidrocarburos y demás productos mineros) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Otros conceptos (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50 (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de trabajo(Retenciones a título de renta)',
    'Rentas de pensiones(Retenciones a título de renta)',
    'Honorarios(Retenciones a título de renta)',
    'Comisiones(Retenciones a título de renta)',
    'Servicios(Retenciones a título de renta)',
    'Rendimientos financieros e intereses(Retenciones a título de renta)',
    'Arrendamientos (Muebles e inmuebles)(Retenciones a título de renta)',
    'Regalías y explotación de la propiedad intelectual(Retenciones a título de renta)',
    'Dividendos y participaciones(Retenciones a título de renta)',
    'Compras(Retenciones a título de renta)',
    'Transacciones con tarjetas débito y crédito(Retenciones a título de renta)',
    'Contratos de construcción(Retenciones a título de renta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito(Retenciones a título de renta)',
    'Loterías, rifas, apuestas y similares(Retenciones a título de renta)',
    'Otros pagos sujetos a retención(Retenciones a título de renta)',
    'Autorretenciones - Contribuyentes exonerados de aportes (art. 114-1 E.T.)(Retenciones a título de renta)',
    'Autorretenciones - Ventas(Retenciones a título de renta)',
    'Autorretenciones - Honorarios(Retenciones a título de renta)',
    'Autorretenciones - Comisiones(Retenciones a título de renta)',
    'Autorretenciones - Servicios(Retenciones a título de renta)',
    'Autorretenciones - Rendimientos financieros(Retenciones a título de renta)',
    'Autorretenciones - Pagos mensuales provisionales de carácter voluntario (hidrocarburos y demás productos mineros)(Retenciones a título de renta)',
    'Autorretenciones - Otros conceptos(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente(Retenciones a título de renta)',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas (Retenciones a título de renta)',
    'Total retenciones renta y complementario (Retenciones a título de renta)',
    'A responsables del impuesto sobre las ventas',
    'Practicadas por servicios a no residentes o no domiciliados',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas',
    'Total retenciones IVA',
    'Retenciones impuesto timbre nacional',
    'Retenciones impuesto nacional al consumo',
    'Total retenciones',
    'Sanciones',
    'Total retenciones más sanciones'
];
const conceptosRetencionesArr2018 = [
    'Rentas de trabajo (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de pensiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rendimientos financieros (Base sujeta a retención para pagos o abonos en cuenta)',
    'Arrendamientos (Muebles e inmuebles) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Regalías y explotación de la propiedad intelectual (Base sujeta a retención para pagos o abonos en cuenta)',
    'Dividendos y participaciones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Compras (Base sujeta a retención para pagos o abonos en cuenta)',
    'Transacciones con tarjetas débito y crédito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Contratos de construcción (Base sujeta a retención para pagos o abonos en cuenta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Loterías, rifas, apuestas y similares (Base sujeta a retención para pagos o abonos en cuenta)',
    'Otros pagos sujetos a retención (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Contribuyentes exonerados de aportes (art. 114-1 E.T.) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Ventas (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Rendimientos financieros (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Otros conceptos (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50 (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de trabajo(Retenciones a título de renta)',
    'Rentas de pensiones(Retenciones a título de renta)',
    'Honorarios(Retenciones a título de renta)',
    'Comisiones(Retenciones a título de renta)',
    'Servicios(Retenciones a título de renta)',
    'Rendimientos financieros (Retenciones a título de renta)',
    'Arrendamientos (Muebles e inmuebles)(Retenciones a título de renta)',
    'Regalías y explotación de la propiedad intelectual(Retenciones a título de renta)',
    'Dividendos y participaciones(Retenciones a título de renta)',
    'Compras(Retenciones a título de renta)',
    'Transacciones con tarjetas débito y crédito(Retenciones a título de renta)',
    'Contratos de construcción(Retenciones a título de renta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito(Retenciones a título de renta)',
    'Loterías, rifas, apuestas y similares(Retenciones a título de renta)',
    'Otros pagos sujetos a retención(Retenciones a título de renta)',
    'Autorretenciones - Contribuyentes exonerados de aportes (art. 114-1 E.T.)(Retenciones a título de renta)',
    'Autorretenciones - Ventas(Retenciones a título de renta)',
    'Autorretenciones - Honorarios(Retenciones a título de renta)',
    'Autorretenciones - Comisiones(Retenciones a título de renta)',
    'Autorretenciones - Servicios(Retenciones a título de renta)',
    'Autorretenciones - Rendimientos financieros(Retenciones a título de renta)',
    'Autorretenciones - Otros conceptos(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente(Retenciones a título de renta)',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas (Retenciones a título de renta)',
    'Total retenciones renta y complementario (Retenciones a título de renta)',
    'A responsables del impuesto sobre las ventas',
    'Practicadas por servicios a no residentes o no domiciliados',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas',
    'Total retenciones IVA',
    'Retenciones impuesto timbre nacional',
    'Total retenciones',
    'Sanciones',
    'Total retenciones más sanciones'
];
const conceptosRetencionesArr2017 = [
    'Rentas de trabajo (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de pensiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rendimientos financieros (Base sujeta a retención para pagos o abonos en cuenta)',
    'Arrendamientos (Muebles e inmuebles) (Base sujeta a retención para pagos o abonos en cuenta)',
    'Regalías y explotación de la propiedad intelectual (Base sujeta a retención para pagos o abonos en cuenta)',
    'Dividendos y participaciones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Compras (Base sujeta a retención para pagos o abonos en cuenta)',
    'Transacciones con tarjetas débito y crédito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Contratos de construcción (Base sujeta a retención para pagos o abonos en cuenta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito (Base sujeta a retención para pagos o abonos en cuenta)',
    'Loterías, rifas, apuestas y similares (Base sujeta a retención para pagos o abonos en cuenta)',
    'Otros pagos sujetos a retención (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Decreto 2201 de 2016  (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Ventas (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Honorarios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Comisiones (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Servicios (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Rendimientos financieros (Base sujeta a retención para pagos o abonos en cuenta)',
    'Autorretenciones - Otros conceptos (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50 (Base sujeta a retención para pagos o abonos en cuenta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente (Base sujeta a retención para pagos o abonos en cuenta)',
    'Rentas de trabajo(Retenciones a título de renta)',
    'Rentas de pensiones(Retenciones a título de renta)',
    'Honorarios(Retenciones a título de renta)',
    'Comisiones(Retenciones a título de renta)',
    'Servicios(Retenciones a título de renta)',
    'Rendimientos financieros (Retenciones a título de renta)',
    'Arrendamientos (Muebles e inmuebles)(Retenciones a título de renta)',
    'Regalías y explotación de la propiedad intelectual(Retenciones a título de renta)',
    'Dividendos y participaciones(Retenciones a título de renta)',
    'Compras(Retenciones a título de renta)',
    'Transacciones con tarjetas débito y crédito(Retenciones a título de renta)',
    'Contratos de construcción(Retenciones a título de renta)',
    'Enajenación de activos fijos de personas naturales ante notarios y autoridades de tránsito(Retenciones a título de renta)',
    'Loterías, rifas, apuestas y similares(Retenciones a título de renta)',
    'Otros pagos sujetos a retención(Retenciones a título de renta)',
    'Autorretenciones - Decreto 2201 de 2016 (Retenciones a título de renta)',
    'Autorretenciones - Ventas(Retenciones a título de renta)',
    'Autorretenciones - Honorarios(Retenciones a título de renta)',
    'Autorretenciones - Comisiones(Retenciones a título de renta)',
    'Autorretenciones - Servicios(Retenciones a título de renta)',
    'Autorretenciones - Rendimientos financieros(Retenciones a título de renta)',
    'Autorretenciones - Otros conceptos(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países sin convenio 50(Retenciones a título de renta)',
    'Pagos o abonos en cuenta al exterior a países con convenio vigente(Retenciones a título de renta)',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas (Retenciones a título de renta)',
    'Total retenciones renta y complementario (Retenciones a título de renta)',
    'A responsables del impuesto sobre las ventas',
    'Practicadas por servicios a no residentes o no domiciliados',
    'Menos retenciones practicadas en exceso o indebidas o por operaciones anuladas, rescindidas o resueltas',
    'Total retenciones IVA',
    'Retenciones impuesto timbre nacional',
    'Total retenciones',
    'Sanciones',
    'Total retenciones más sanciones'
];
const conceptosIcaArr2018 = [
    'TOTAL INGRESOS ORDINARIOS Y EXTRAORDINARIOS DEL PERIODO',
    'TOTAL INGRESOS OBTENIDOS FUERA DEL DISTRITO CAPITAL',
    'TOTAL INGRESOS BRUTOS OBTENIDOS EN EL DISTRITO CAPITAL (renglón 9 - 10)',
    'DEVOLUCIONES, REBAJAS Y DESCUENTOS',
    'DEDUCCIONES, EXENCIONES Y ACTIVIDADES NO SUJETAS',
    'TOTAL INGRESOS NETOS GRAVABLES (renglón 11 - 12 - 13) BE',
    'IMPUESTO DE INDUSTRIA Y COMERCIO',
    'IMPUESTO DE AVISOS Y TABLEROS (15% de Renglón 15)',
    'VALOR TOTAL DE UNIDADES COMERCIALES ADICIONALES',
    'TOTAL IMPUESTO A CARGO (renglón 15 + renglón 16 + renglón 17)',
    'VALOR RETENIDO A TITULO DE IMPUESTO DE INDUSTRIA Y COMERCIO',
    'SANCIONES',
    'TOTAL SALDO A CARGO (renglón 18 - renglón 19 + renglón 20)',
    'VALOR A PAGAR',
    'INTERESES DE MORA',
    'TOTAL A PAGAR (renglón 22 + renglón 23)',
    'PAGO VOLUNTARIO (10% del renglón 18)',
    'TOTAL A PAGAR CON PAGO VOLUNTARIO (renglón 24 + renglón 25)'
];
const conceptosIcaArr2019 = [
    'TOTAL INGRESOS ORDINARIOS Y EXTRAORDINARIOS DEL PERIODO EN TODO EL PAIS',
    'MENOS INGRESOS FUERA DE ESTE MUNICIPIO O DISTRITO',
    'TOTAL INGRESOS ORDINARIOS Y EXTRAORDINARIOS EN ESTE MUNICIPIO (RENGLÓN 8 MENOS 9)',
    'MENOS INGRESOS POR DEVOLUCIONES, REBAJAS, DESCUENTOS',
    'MENOS INGRESOS POR EXPORTACIONES',
    'MENOS INGRESOS POR VENTA DE ACTIVOS FIJOS',
    'MENOS INGRESOS POR ACTIVIDADES EXCLUIDAS O NO SUJETAS Y OTROS INGRESOS NO GRAVADOS',
    'MENOS INGRESOS POR OTRAS ACTIVIDADES EXENTAS EN ESTE MUNICIPIO O DISTRITO (POR ACUERDO)',
    'TOTAL INGRESOS GRAVABLES (RENGLÓN 10 MENOS 11,12,13,14 Y 15)',
    'TOTAL IMPUESTOS',
    'GENERACIÓN DE ENERGÍA CAPACIDAD INSTALADA',
    'IMPUESTO LEY 56 DE 1981',
    'TOTAL IMPUESTO DE INDUSTRIA Y COMERCIO (RENGLÓN 17+19)',
    'IMPUESTO DE AVISOS Y TABLEROS (15% DEL RENGLÓN 20)',
    'PAGO POR UNIDADES COMERCIALES ADICIONALES DEL SECTOR FINANCIERO',
    'SOBRETASA BOMBERIL (Ley 1575 de 2012) (Si la hay, liquídela según el acuerdo municipal o distrital)',
    'SOBRETASA DE SEGURIDAD (LEY 1421 de 2011) (Si la hay, liquídela según el acuerdo municipal o distrital)',
    'TOTAL IMPUESTO A CARGO (RENGLONES 20+21+22+23+24)',
    'MENOS VALOR DE EXENCIÓN O EXONERACIÓN SOBRE EL IMPUESTO Y NO SOBRE LOS INGRESOS',
    'MENOS RETENCIONES que le practicaron a favor de este municipio o distrito en este período',
    'MENOS AUTORRETENCIONES practicadas a favor de este municipio o distrito en este período',
    'MENOS ANTICIPO LIQUIDADO EN EL AÑO ANTERIOR',
    'ANTICIPO DEL AÑO SIGUIENTE (Si existe, liquide porcentaje según Acuerdo Municipal o distrital)',
    'SANCIONES',
    'MENOS SALDO A FAVOR DEL PERIODO ANTERIOR SIN SOLICITUD DE DEVOLUCIÓN O COMPENSACIÓN',
    'TOTAL SALDO A CARGO (REGLON 25-26-27-28-29+30+31-32)',
    'TOTAL SALDO A FAVOR (REGLON 25-26-27-28-29+30+31-32) si el resultado es menor a cero',
    'VALOR A PAGAR',
    'DESCUENTO POR PRONTO PAGO (Si existe, liquídelo según el Acuerdo Municipal o distrital)',
    'INTERESES DE MORA',
    'TOTAL A PAGAR (RENGLÓN 35 - 36 +37)',
    'LIQUIDE EL VALOR DEL PAGO VOLUNTARIO (Según instrucciones del municipio/distrito)',
    'TOTAL A PAGAR CON PAGO VOLUNTARIO (Reglón 38 + 39)'
];
const conceptosIvaArr2019 = [
    'Ingresos por operaciones gravadas al 5%',
    'Ingresos por operaciones gravadas a la tarifa general',
    'Ingresos A.I.U por operaciones gravadas (base gravable especial)',
    'Ingresos por exportación de bienes',
    'Ingresos por exportación de servicios',
    'Ingresos por ventas a sociedades de comercialización internacional',
    'Ingresos por ventas a zonas francas',
    'Ingresos por juegos de suerte y azar',
    'Ingresos por operaciones exentas (Arts. 477, 478 y 481 del ET)',
    'Ingresos por venta de cerveza de producción nacional o importada',
    'Ingresos por venta de gaseosas y similares',
    'Ingresos por venta de licores, aperitivos, vinos y similares',
    'Ingresos por operaciones excluidas',
    'Ingresos por operaciones no gravadas',
    'Total ingresos brutos',
    'Devoluciones en ventas anuladas, rescindidas o resueltas',
    'Total ingresos netos recibidos durante el período',
    'Compras importación de bienes gravados a la tarifa del 5%',
    'Compras importación de bienes gravados a la tarifa general',
    'Compras importación de bienes y servicios gravados provenientes de Zonas Francas',
    'Compras importación de bienes no gravados',
    'Compras importación de bienes excluidos, exentos y no gravados provenientes de Zonas Francas',
    'Compras importación de servicios',
    'Compras nacionales de bienes gravados a la tarifa del 5%',
    'Compras nacionales de bienes gravados a la tarifa general',
    'Compras nacionales de servicios gravados a la tarifa del 5%',
    'Compras nacionales de servicios gravados a la tarifa general',
    'Compras nacionales de bienes y servicios excluidos, exentos y no gravados',
    'Total compras e importaciones brutas',
    'Devoluciones en compras anuladas, rescindidas o resueltas en este período',
    'Total compras netas realizadas durante el período',
    'A la tarifa del 5%',
    'A la tarifa general',
    'Sobre A.I.U en operaciones gravadas (base gravable especial)',
    'En juegos de suerte y azar',
    'En venta cerveza de producción nacional o importada',
    'En venta de gaseosas y similares',
    'En venta de licores, aperitivos, vinos y similares 5%',
    'En retiro de inventario para activos fijos, consumo, muestras gratis o donaciones',
    'IVA recuperado en devoluciones en compras anuladas, rescindidas o resueltas',
    'Total impuesto generado por operaciones gravadas',
    'Por importaciones gravadas a tarifa del 5%',
    'Por importaciones gravadas la tarifa general',
    'De bienes y servicios gravados provenientes de Zonas Francas',
    'Por compras de bienes gravados a la tarifa 5%',
    'Por compras de bienes gravados a tarifa general',
    'Por licores, aperitivos, vinos y similares',
    'Por servicios gravados a la tarifa del 5%',
    'Por servicios gravados a la tarifa general',
    'Descuento IVA exploración hidrocarburos Art. 485-2 ET',
    'Total Impuesto pagado o facturado',
    'IVA retenido por servicios prestados en Colombia por no domiciliados o no residentes',
    'IVA resultante por devoluciones en ventas anuladas, rescindidas o resueltas',
    'Ajuste impuestos descontables (perdidas, hurto o castigo de inventarios)',
    'Total impuestos descontables',
    'Saldo a pagar por el período fiscal',
    'Saldo a favor del período fiscal',
    'Saldo a favor del período fiscal anterior',
    'Retenciones por IVA que le practicaron',
    'Saldo a pagar por impuesto',
    'Sanciones',
    'Total saldo a pagar',
    'o Total saldo a favor',
    'Saldo a favor susceptible de devolución y/o compensación por el presente período',
    'Saldo a favor susceptible de ser devuelto y/o compensado a imputar en el período siguiente',
    'Saldo a favor sin derecho a dev. y/o compensación susceptible de ser imputado en el período siguiente',
    'Total saldo a favor a imputar al periodo siguiente',
    'Bimestre 1',
    'Bimestre 2',
    'Bimestre 3',
    'Bimestre 4',
    'Bimestre 5',
    'Bimestre 6',
    'Total anticipos IVA Régimen SIMPLE'
];
const conceptosIvaArr2018y2017 = [
    'Ingresos por operaciones gravadas al 5%',
    'Ingresos por operaciones gravadas a la tarifa general',
    'Ingresos A.I.U por operaciones gravadas (base gravable especial)',
    'Ingresos por exportación de bienes',
    'Ingresos por exportación de servicios',
    'Ingresos por ventas a sociedades de comercialización internacional',
    'Ingresos por ventas a zonas francas',
    'Ingresos por juegos de suerte y azar',
    'Ingresos por operaciones exentas (Arts. 477, 478 y 481 del ET)',
    'Ingresos por venta de cerveza de producción nacional o importada',
    'Ingresos por venta de licores, aperitivos, vinos y similares',
    'Ingresos por operaciones excluidas',
    'Ingresos por operaciones no gravadas',
    'Total ingresos brutos',
    'Devoluciones en ventas anuladas, rescindidas o resueltas',
    'Total ingresos netos recibidos durante el período',
    'Compras importación de bienes gravados a la tarifa del 5%',
    'Compras importación de bienes gravados a la tarifa general',
    'Compras importación de bienes y servicios gravados provenientes de Zonas Francas',
    'Compras importación de bienes no gravados',
    'Compras importación de bienes excluidos, exentos y no gravados provenientes de Zonas Francas',
    'Compras importación de servicios',
    'Compras nacionales de bienes gravados a la tarifa del 5%',
    'Compras nacionales de bienes gravados a la tarifa general',
    'Compras nacionales de servicios gravados a la tarifa del 5%',
    'Compras nacionales de servicios gravados a la tarifa general',
    'Compras nacionales de bienes y servicios excluidos, exentos y no gravados',
    'Total compras e importaciones brutas',
    'Devoluciones en compras anuladas, rescindidas o resueltas en este período',
    'Total compras netas realizadas durante el período',
    'A la tarifa del 5%',
    'A la tarifa general',
    'Sobre A.I.U en operaciones gravadas (base gravable especial)',
    'En juegos de suerte y azar',
    'En venta cerveza de producción nacional o importada',
    'En venta de licores, aperitivos, vinos y similares 5%',
    'En retiro de inventario para activos fijos, consumo, muestras gratis o donaciones',
    'IVA recuperado en devoluciones en compras anuladas, rescindidas o resueltas',
    'Total impuesto generado por operaciones gravadas',
    'Por importaciones gravadas a tarifa del 5%',
    'Por importaciones gravadas la tarifa general',
    'De bienes y servicios gravados provenientes de Zonas Francas',
    'Por compras de bienes gravados a la tarifa 5%',
    'Por compras de bienes gravados a tarifa general',
    'Por licores, aperitivos, vinos y similares',
    'Por servicios gravados a la tarifa del 5%',
    'Por servicios gravados a la tarifa general',
    'Descuento IVA exploración hidrocarburos Art. 485-2 ET',
    'Total Impuesto pagado o facturado',
    'IVA retenido por servicios prestados en Colombia por no domiciliados o no residentes',
    'IVA resultante por devoluciones en ventas anuladas, rescindidas o resueltas',
    'Ajuste impuestos descontables (perdidas, hurto o castigo de inventarios)',
    'Total impuestos descontables',
    'Saldo a pagar por el período fiscal',
    'Saldo a favor del período fiscal',
    'Saldo a favor del período fiscal anterior',
    'Retenciones por IVA que le practicaron',
    'Saldo a pagar por impuesto',
    'Sanciones',
    'Total saldo a pagar por este período',
    'o Total saldo a favor por este período',
    'Saldo a favor susceptible de devolución y/o compensación por el presente período',
    'Saldo a favor susceptible de ser devuelto y/o compensado a imputar en el período siguiente',
    'Saldo a favor sin derecho a dev. y/o compensación susceptible de ser imputado en el período siguiente',
    'Total saldo a favor a imputar al periodo siguiente',
];
const conceptosRentaArr2018 = [
    'Total costos y gastos de nómina',
    'Aportes al sistema de seguridad social',
    'Aportes al SENA, ICBF, cajas de compensación',
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
const conceptosRentaArr2017 = [
    'Total costos y gastos de nómina',
    'Aportes al sistema de seguridad social',
    'Aportes al SENA, ICBF, cajas de compensación',
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
    'Distintas a dividendos gravados al 5%, 35% y 33%',
    'Dividendos gravados a la tarifa del 5%',
    'Dividendos gravados a la tarifa del 35%',
    'Dividendos gravados a la tarifa del 33%',
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
    'Saldo a favor renta CREE año gravable anterior sin solicitud de devolución y/o compensación',
    'Autorretenciones',
    'Otras retenciones',
    'Total retenciones año gravable a declarar',
    'Anticipo renta para el año gravable siguiente',
    'Anticipo sobretasa para el año gravable siguiente',
    'Saldo a pagar por impuesto',
    'Sanciones',
    'Total saldo a pagar',
    'Total saldo a favor'
];
