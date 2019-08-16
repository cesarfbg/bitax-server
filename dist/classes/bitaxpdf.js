"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const xl = require('excel4node');
const mime = require('mime');
class bitaxpdf {
    constructor() { }
    leerRetenciones(data) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Capturamos el Período
        let posicionPeriodo = fileReadedOriginal.indexOf('|||88.');
        posicionPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        posicionPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        let posicionFinalPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        const periodo = fileReadedOriginal.substring(posicionPeriodo + 3, posicionFinalPeriodo).replace(' ', '');
        // Capturamos la Tarifa
        let posicionTarifa = fileReadedOriginal.indexOf('|||88.');
        posicionTarifa = fileReadedOriginal.indexOf('|||', posicionTarifa + 3);
        posicionTarifa = fileReadedOriginal.indexOf('|||', posicionTarifa + 3);
        let idex = 0;
        while (idex <= 69) {
            posicionTarifa = fileReadedOriginal.indexOf('|||', posicionTarifa + 3);
            idex++;
        }
        let posicionFinalTarifa = fileReadedOriginal.indexOf('|||', posicionTarifa + 3);
        let tarifa = fileReadedOriginal.substring(posicionTarifa + 3, posicionFinalTarifa).replace(' ', '');
        tarifa = tarifa.substring(4, tarifa.length);
        // Capturamos el Año Gravable
        let posicionAno = fileReadedOriginal.indexOf('|||88.');
        posicionAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        let posicionFinalAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        const ano = fileReadedOriginal.substring(posicionAno + 3, posicionFinalAno);
        // Capturamos la razón social
        let posicionRS = posicionFinalAno; // Partimos de acá porque estan cerca ambos valores
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const posicionFinalRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const razonSocial = fileReadedOriginal.substring(posicionRS + 3, posicionFinalRS);
        // Capturamos los valores de las celdas
        let posicionValores = posicionRS; // Partimos de acá porque estan cerca ambos valores
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        // Capturamos la posicion final de los valores
        let idx = 0;
        let posicionFinalValores = posicionValores;
        while (idx <= 60) {
            posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
            idx++;
        }
        let valoresArr = fileReadedOriginal.substring(posicionValores + 3, posicionFinalValores);
        valoresArr = valoresArr.split('|||');
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
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        // Llenamos manualmente las primeras filas
        ws.cell(2, 1).string('Período').style(cellStyle);
        ws.cell(2, 2).number(Number(3)).style(cellStyle);
        ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
        ws.cell(2, 4).number(Number(ano)).style(cellStyle);
        ws.cell(2, 5).string(razonSocial).style(cellStyle);
        // Llenamos las celdas con la data
        for (let concepto in conceptosRetencionesArr) {
            ws.cell(Number(concepto) + 3, 1).string(conceptosRetencionesArr[concepto]).style(cellStyle);
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
        // Creamos el libro de excel
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        wb.write('./dist/outputs/Retenciones-Estructurado.xlsx');
        const xlsFile = path_1.default.resolve(__dirname, '../outputs/Retenciones-Estructurado.xlsx');
        // Configuramos headers
        var filename = path_1.default.basename(xlsFile);
        var mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerIva(data) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Capturamos el Período
        let posicionPeriodo = fileReadedOriginal.indexOf('|||25.');
        posicionPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        posicionPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        posicionPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        let posicionFinalPeriodo = fileReadedOriginal.indexOf('|||', posicionPeriodo + 3);
        const periodo = fileReadedOriginal.substring(posicionPeriodo + 3, posicionFinalPeriodo).replace(' ', '');
        // Capturamos el Año Gravable
        let posicionAno = fileReadedOriginal.indexOf('|||Total anticipos IVA');
        posicionAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        let posicionFinalAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        const ano = fileReadedOriginal.substring(posicionAno + 3, posicionFinalAno);
        // Capturamos la razón social
        let posicionRS = posicionFinalAno; // Partimos de acá porque estan cerca ambos valores
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const posicionFinalRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const razonSocial = fileReadedOriginal.substring(posicionRS + 3, posicionFinalRS);
        // Capturamos los valores de las celdas
        let posicionValores = posicionRS; // Partimos de acá porque estan cerca ambos valores
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        posicionValores = fileReadedOriginal.indexOf('|||', posicionValores + 3);
        // Capturamos la posicion final de los valores
        let idx = 0;
        let posicionFinalValores = posicionValores;
        while (idx <= 74) {
            posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
            idx++;
        }
        let valoresArr = fileReadedOriginal.substring(posicionValores + 3, posicionFinalValores - 4);
        valoresArr = valoresArr.split('|||');
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
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        // Llenamos manualmente las primeras filas
        ws.cell(2, 1).string('Período').style(cellStyle);
        ws.cell(2, 2).number(Number(3)).style(cellStyle);
        ws.cell(2, 3).number(Number(periodo)).style(cellStyle);
        ws.cell(2, 4).number(Number(ano)).style(cellStyle);
        ws.cell(2, 5).string(razonSocial).style(cellStyle);
        // Llenamos las celdas con la data
        for (let concepto in conceptosIvaArr) {
            ws.cell(Number(concepto) + 3, 1).string(conceptosIvaArr[concepto]).style(cellStyle);
            ws.cell(Number(concepto) + 3, 2).number(Number(concepto) + 27).style(cellStyle);
            ws.cell(Number(concepto) + 3, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
            ws.cell(Number(concepto) + 3, 4).number(Number(ano)).style(cellStyle);
            ws.cell(Number(concepto) + 3, 5).string(razonSocial).style(cellStyle);
        }
        // Creamos el libro de excel
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        wb.write('./dist/outputs/Iva-Estructurado.xlsx');
        const xlsFile = path_1.default.resolve(__dirname, '../outputs/Iva-Estructurado.xlsx');
        // Configuramos headers
        var filename = path_1.default.basename(xlsFile);
        var mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerRenta(data, file) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Buscamos valores iniciales juntos
        let posicionInitValues = fileReadedOriginal.indexOf('|||104.');
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        posicionInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        let posicionFinalInitValues = fileReadedOriginal.indexOf('|||', posicionInitValues + 3);
        let valoresIniciales = fileReadedOriginal.substring(posicionInitValues + 3, posicionFinalInitValues);
        let arrInitValues = [];
        let posicionFinalNumero = 0;
        let counter = 0;
        for (let i = 0; i < valoresIniciales.length; i++) {
            if (!isNaN(Number(valoresIniciales[i]))) {
                counter++;
                console.log('Numero');
            }
            else {
                counter = 0;
                console.log('Coma');
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
        // Llenamos manualmente las primeras filas
        ws.cell(2, 1).string('Total costos y gastos de nómina').style(cellStyle);
        ws.cell(2, 2).number(Number(30)).style(cellStyle);
        ws.cell(2, 3).number(Number(arrInitValues[0].replace(/,/g, ''))).style(cellStyle);
        ws.cell(2, 4).number(Number(ano)).style(cellStyle);
        ws.cell(2, 5).string(razonSocial).style(cellStyle);
        ws.cell(3, 1).string('Aportes al sistema de seguridad social').style(cellStyle);
        ws.cell(3, 2).number(Number(31)).style(cellStyle);
        ws.cell(3, 3).number(Number(arrInitValues[1].replace(/,/g, ''))).style(cellStyle);
        ws.cell(3, 4).number(Number(ano)).style(cellStyle);
        ws.cell(3, 5).string(razonSocial).style(cellStyle);
        ws.cell(4, 1).string('Aportes al SENA, ICBF, cajas de compensación').style(cellStyle);
        ws.cell(4, 2).number(Number(32)).style(cellStyle);
        ws.cell(4, 3).number(Number(arrInitValues[2].replace(/,/g, ''))).style(cellStyle);
        ws.cell(4, 4).number(Number(ano)).style(cellStyle);
        ws.cell(4, 5).string(razonSocial).style(cellStyle);
        let idx = 5;
        for (let concepto in conceptosRentaArr) {
            ws.cell(idx, 1).string(conceptosRentaArr[concepto]).style(cellStyle);
            ws.cell(idx, 5).string(razonSocial).style(cellStyle);
            ws.cell(idx, 4).number(Number(ano)).style(cellStyle);
            idx++;
        }
        idx = 5;
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
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
    leerIca(data) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
        // Verificamos si es ANUAL
        let posicionAnual = 0;
        let idex = 0;
        while (idex <= 94) {
            posicionAnual = fileReadedOriginal.indexOf('|||', posicionAnual + 3);
            idex++;
        }
        let posicionFinalAnual = fileReadedOriginal.indexOf('|||', posicionAnual + 3);
        let anualCheck = fileReadedOriginal.substring(posicionAnual + 3, posicionFinalAnual);
        let bimestreOAnual = 'No se pudo capturar el período';
        if (anualCheck == 'X') {
            bimestreOAnual = 'Anual';
        }
        // Capturamos el Año Gravable
        let posicionAno = fileReadedOriginal.indexOf('||MUNICIPIO O DISTRITO:');
        posicionAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        let posicionFinalAno = fileReadedOriginal.indexOf('|||', posicionAno + 3);
        let ano = fileReadedOriginal.substring(posicionAno + 3, posicionFinalAno);
        ano = ano.split('/');
        ano = ano.pop();
        // Capturamos la razón social
        let posicionRS = fileReadedOriginal.indexOf('|||NOMBRES Y APELLIDOS O RAZÓN SOCIAL:');
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        posicionRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const posicionFinalRS = fileReadedOriginal.indexOf('|||', posicionRS + 3);
        const razonSocial = fileReadedOriginal.substring(posicionRS + 3, posicionFinalRS);
        // Capturamos los valores de las celdas
        let posicionInicialValores = posicionRS;
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        let posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        let valoresArr = fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||');
        posicionInicialValores = fileReadedOriginal.indexOf('|||40.');
        posicionInicialValores = fileReadedOriginal.indexOf('|||DEPARTAMENTO', posicionInicialValores);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        posicionInicialValores = fileReadedOriginal.indexOf('|||MUNICIPIO O DISTRITO DE LA DIRECCIÓN:');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        posicionInicialValores = fileReadedOriginal.indexOf('|||17. TOTAL IMPUESTOS');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        // Lenamos el campo 18 que viene vacío
        valoresArr.push('');
        // Seguimos con el campo 19
        posicionInicialValores = fileReadedOriginal.indexOf('|||40.');
        posicionInicialValores = fileReadedOriginal.indexOf('|||DEPARTAMENTO', posicionInicialValores);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        posicionInicialValores = fileReadedOriginal.indexOf('|||MENOS VALOR DE EXENCIÓN O EXONERACIÓN SOBRE EL IMPUESTO Y NO SOBRE LOS INGRESOS');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        let posicion25 = fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        let posicion27 = fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores);
        posicionInicialValores = fileReadedOriginal.indexOf('|||40.');
        posicionInicialValores = fileReadedOriginal.indexOf('|||DEPARTAMENTO', posicionInicialValores);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        let arrTmpPosiciones = fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||');
        // Llenamos 23
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 24
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 25
        valoresArr.push(posicion25);
        // Llenamos 26
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 27
        valoresArr.push(posicion27);
        // Llenamos 28
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 29
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 30
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 31
        posicionInicialValores = fileReadedOriginal.indexOf('|||NOMBRES Y APELLIDOS O RAZÓN SOCIAL:');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores));
        // Llenamos 32
        posicionInicialValores = fileReadedOriginal.indexOf('|||OTRA');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores));
        // Llenamos 33
        posicionInicialValores = fileReadedOriginal.indexOf('|||MUNICIPIO O DISTRITO DE LA DIRECCIÓN:');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores));
        // Llenamos 34
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 35
        posicionInicialValores = fileReadedOriginal.indexOf('|||MENOS ANTICIPO LIQUIDADO EN EL AÑO ANTERIOR');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        valoresArr.push(fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores));
        // Llenamos 36
        valoresArr.push(arrTmpPosiciones.shift() || '');
        // Llenamos 37 y 38
        posicionInicialValores = fileReadedOriginal.indexOf('|||SANCIONES.');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
        // Llenamos 39 y 40
        posicionInicialValores = fileReadedOriginal.indexOf('|||MENOS SALDO A FAVOR DEL PERIODO ANTERIOR SIN SOLICITUD DE DEVOLUCIÓN O COMPENSACIÓN');
        posicionInicialValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionInicialValores + 3);
        posicionFinalValores = fileReadedOriginal.indexOf('|||', posicionFinalValores + 3);
        valoresArr.push(...fileReadedOriginal.substring(posicionInicialValores + 3, posicionFinalValores).split('|||'));
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
        // Llenamos las cabeceras
        ws.cell(1, 1).string('Concepto').style(headerStlye);
        ws.cell(1, 2).string('Campo').style(headerStlye);
        ws.cell(1, 3).string('Valor').style(headerStlye);
        ws.cell(1, 4).string('Año').style(headerStlye);
        ws.cell(1, 5).string('Razón Social').style(headerStlye);
        // Llenamos manualmente las primeras filas
        ws.cell(35, 1).string('Bimestre o Período Anual').style(cellStyle);
        ws.cell(35, 2).string('N/A').style(cellStyle);
        ws.cell(35, 3).string(bimestreOAnual).style(cellStyle);
        ws.cell(35, 4).number(Number(ano)).style(cellStyle);
        ws.cell(35, 5).string(razonSocial).style(cellStyle);
        // Llenamos las celdas con la data
        for (let concepto in conceptosIcaArr) {
            ws.cell(Number(concepto) + 2, 1).string(conceptosIcaArr[concepto]).style(cellStyle);
            ws.cell(Number(concepto) + 2, 2).number(Number(concepto) + 8).style(cellStyle);
            ws.cell(Number(concepto) + 2, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
            ws.cell(Number(concepto) + 2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(Number(concepto) + 2, 5).string(razonSocial).style(cellStyle);
        }
        // Creamos el libro de excel
        ws.column(1).setWidth(70);
        ws.column(5).setWidth(30);
        wb.write('./dist/outputs/Ica-Estructurado.xlsx');
        const xlsFile = path_1.default.resolve(__dirname, '../outputs/Ica-Estructurado.xlsx');
        // Configuramos headers
        var filename = path_1.default.basename(xlsFile);
        var mimetype = mime.lookup(xlsFile);
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
}
exports.default = bitaxpdf;
const conceptosRetencionesArr = [
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
const conceptosIcaArr = [
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
const conceptosIvaArr = [
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
const conceptosRentaArr = [
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
