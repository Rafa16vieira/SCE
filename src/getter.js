import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const printToFile = async (nome, key, context, purpose, identificacao, autores, data, tipo, norma, link, contexto, revisao, consistencia, amostra, usos, implementacao, vieses, conflitos, sintese, fort, nalt, enf, relevancia, cobertura, forca, perigo, falha, selo, classificacao ) => {
    const html = `
    <!DOCTYPE html>
    <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
        @page  {
            margin: 0;
            size: 215.9mm 279.4mm; /*or width then height 150mm 50mm*/
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        
        
        td, th {
            border: 1px solid #000;
            text-align: left;
            padding: 8px;
        }
        
        tr:nth-child(even) {
            background-color: #fff;
        }
        </style>
        </head>
        <body>


        <table>
        <tr>
            <th colspan="4" style="font-weight: bold; text-align: center;">CLASSIFICAÇÃO DA EVIDÊNCIA</th>
        </tr>
        <tr>
            <th>Nome</th>
            <td colspan="2" style="width: 300px">${nome}</td>
            <th class="tg-0pky" rowspan="4" style="transform: rotate(-90deg);text-align:center;">ETAPA DE INTRODUÇÃO</th>
        </tr>
        <tr>
            <th>Palavras-chave</th>
            <td colspan="2" style="width: 300px">${key}</td>
        </tr>
        <tr>
            <th>Contextualização</th>
            <td colspan="2" style="width: 300px">${context}</td>
        </tr>
        <tr>
            <th>Propósito</th>
            <td colspan="2" style="width: 300px">${purpose}</td>
        </tr>
        <tr>
            <th>Identificação</th>
            <td colspan="2" style="width: 300px">${identificacao}</td>
            <th rowspan="10" style="transform: rotate(-90deg);text-align: center;">ETAPA DE APRESENTAÇÃO</th>
        </tr>
        <tr>
            <th>fonte</th>
            <td colspan="2" style="width: 300px"></td>
        </tr>
        <tr>
            <th>Autores</th>
            <td colspan="2" style="width: 300px">${autores}</td>
        </tr>
        <tr>
            <th>Data</th>
            <td colspan="2" style="width: 300px">${data}</td>
        </tr>
        <tr>
            <th>Tipo</th>
            <td colspan="2" style="width: 300px">${tipo}</td>
        </tr>
        <tr>
            <th>Norma Regulatória</th>
            <td colspan="2" style="width: 300px">${norma}</td>
        </tr>
        <tr>
            <th>Link da fonte</th>
            <td colspan="2" style="width: 300px">${link}</td>
        </tr>
        <tr>
            <th style="font-weight: bold;">Contextualizar</th>
            <td colspan="2" style="width: 300px">${contexto}</td>
        </tr>
        <tr>
            <th style="font-weight: bold;"> Revisão por pares</th>
            <td colspan="2" style="width: 300px">${revisao}</td>
        </tr>
        <tr>
            <th style="font-weight: bold;">Consistência</th>
            <td colspan="2" style="width: 300px">${consistencia}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">Metodologia</th>
            <td colspan="2" style="width: 300px"></td>
            <th rowspan="6" style="transform: rotate(-90deg);text-align: center;">ETAPA DE ANÁLISE CRÍTICA</th>
        </tr>
        <tr>
            <th>Texto de amostra</th>
            <td colspan="2" style="width: 300px">${amostra}</td>
        </tr>
        <tr>
            <th>Usos conhecidos</th>
            <td colspan="2" style="width: 300px">${usos}</td>
        </tr>
        <tr>
            <th>Implementação</th>
            <td colspan="2" style="width: 300px">${implementacao}</td>
        </tr>
        <tr>
            <th>Possíveis Viéses</th>
            <td colspan="2" style="width: 300px">${vieses}</td>
        </tr>
        <tr>
            <th>Conflitos de interesse</th>
            <td colspan="2" style="width: 300px">${conflitos}</td>
        </tr>
        <tr>
            <th>Sintese da analise</th>
            <td colspan="2" style="width: 300px">${sintese}</td>
            <th rowspan="8" style="transform: rotate(-90deg);text-align: center;">ETAPA DA CLASSIFICAÇÃO</th>
        </tr>
        <tr>
            <th style="font-weight: bold;">A evidência</th>
            <td colspan="2" style="width: 300px"></td>
        </tr>
        <tr>
            <th style="text-align: center;">Fortalece a compreensão</th>
            <td colspan="2" style="width: 300px">${fort}</td>
        </tr>
        <tr>
            <th style="text-align: center;">Não altera a compreensão</th>
            <td colspan="2" style="width: 300px">${nalt}</td>
        </tr>
        <tr>
            <th style="text-align: center;">Enfraquece a compreensão</th>
            <td colspan="2" style="width: 300px">${enf}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">RELEVANCIA (R)</th>
            <td colspan="2" style="width: 300px">${relevancia}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">COBERTURA (C)</th>
            <td colspan="2" style="width: 300px">${cobertura}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">FORÇA (F)</th>
            <td colspan="2" style="width: 300px">${forca}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">GRAU DO PERIGO (GP)</th>
            <td colspan="2" style="width: 300px">${perigo}</td>
            <th rowspan="4" style="transform: rotate(-90deg);text-align: center">ETAPA DO CÁLCULO DA RELEVÂNCIA</th>
        </tr>
        <tr>
            <th style="font-weight: bolder;">PROBABILIDADE DE FALHAS (PF)</th>
            <td colspan="2" style="width: 300px">${falha}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">SELO DA EVIDÊNCIA</th>
            <td colspan="2" style="width: 300px">${selo}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">CLASSIFICAÇAO DA EVIDENCIA</th>
            <td colspan="2" style="font-weight: bolder; width: 300px;">${classificacao}</td>
        </tr>


        </table> 
        </body>
    </html>
`;
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};