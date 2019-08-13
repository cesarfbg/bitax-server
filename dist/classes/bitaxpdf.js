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
    leerIva(data, file) {
        let fileReaded = data.text;
        const fileReadedOriginal = fileReaded.replace(/\n/g, '|||');
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
        // Llenamos las celdas con la data
        for (let concepto in conceptosIvaArr) {
            ws.cell(Number(concepto) + 2, 1).string(conceptosIvaArr[concepto]).style(cellStyle);
            ws.cell(Number(concepto) + 2, 2).number(Number(concepto) + 27).style(cellStyle);
            ws.cell(Number(concepto) + 2, 3).number(Number(valoresArr[concepto].replace(/,/g, ''))).style(cellStyle);
            ws.cell(Number(concepto) + 2, 4).number(Number(ano)).style(cellStyle);
            ws.cell(Number(concepto) + 2, 5).string(razonSocial).style(cellStyle);
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
        for (let concepto in conceptosRentaArr) {
            ws.cell(idx, 1).string(conceptosRentaArr[concepto]).style(cellStyle);
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
        return ({
            filename,
            mimetype,
            xlsFile
        });
    }
}
exports.default = bitaxpdf;
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
