import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export const printToFile = async (
    nome, key, context, purpose, identificacao, autores, data, tipo, norma, link, contexto, revisao, consistencia, amostra, usos, implementacao, vieses, conflitos, sintese, fort, nalt, enf, relevancia, cobertura, forca, perigo, falha, selo, classificacao, avaliador
) => {
    const html = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                @page {
                    margin: 20mm;
                    size: A4;
                }
                
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                table {
                    font-family: Arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }

                td, th {
                    border: 1px solid #000;
                    text-align: left;
                    padding: 8px;
                    word-wrap: break-word;
                }
                tr {
                    background-color: #f0f0f0; /* cor de fundo mais clara para títulos */
                    font-weight: bold;
                }

                tr.dark {
                    background-color: #c0c0c0; /* cor de fundo mais escura para títulos */
                }


                pre {
                    font-family: Arial, sans-serif;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                }
                
                th.rotate {
                    transform: rotate(-90deg);
                    text-align: center;
                    white-space: nowrap;
                }
                
                @media print {
                    body {
                        margin: 0;
                    }
                }
            </style>
        </head>
        <body>
            <table>
                <!-- Linhas mais escuras -->
        <tr class="dark">
            <th colspan="4" style="text-align: center;">CLASSIFICAÇÃO DA EVIDÊNCIA</th>
        </tr>
        <tr>
            <th>Nome</th>
            <td style="width: 50%;">${nome}</td>
            <th class="rotate" rowspan="4">ETAPA DE INTRODUÇÃO</th>
        </tr>
        <tr>
            <th>Palavras-chave</th>
            <td>${key}</td>
        </tr>
        <tr>
            <th>Contextualização</th>
            <td>${context}</td>
        </tr>
        <tr>
            <th>Propósito</th>
            <td><pre>${purpose}</pre></td>
        </tr>
        <tr class="dark">
            <th>Identificação</th>
            <td>${identificacao}</td>
            <th class="rotate dark" rowspan="10">ETAPA DE APRESENTAÇÃO</th>
        </tr>
        <tr class="dark">
            <th>Fonte</th>
            <td></td>
        </tr>
        <tr class="dark">
            <th>Autores</th>
            <td>${autores}</td>
        </tr>
        <tr class="dark">
            <th>Data</th>
            <td>${data}</td>
        </tr>
        <tr class="dark">
            <th>Tipo</th>
            <td>${tipo}</td>
        </tr>
        <tr class="dark">
            <th>Norma Regulatória</th>
            <td><pre>${norma}</pre></td>
        </tr>
        <tr class="dark">
            <th>Link da fonte</th>
            <td>${link}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bold;">Contextualizar</th>
            <td>${contexto}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bold;">Revisão por pares</th>
            <td>${revisao}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bold;">Consistência</th>
            <td>${consistencia}</td>
        </tr>
        <!-- Linhas mais claras -->
        <tr>
            <th style="font-weight: bolder;">Metodologia</th>
            <td></td>
            <th class="rotate" rowspan="6">ETAPA DE ANÁLISE CRÍTICA</th>
        </tr>
        <tr>
            <th>Texto de amostra</th>
            <td>${amostra}</td>
        </tr>
        <tr>
            <th>Usos conhecidos</th>
            <td><pre>${usos}</pre></td>
        </tr>
        <tr>
            <th>Implementação</th>
            <td>${implementacao}</td>
        </tr>
        <tr>
            <th>Possíveis Viéses</th>
            <td>${vieses}</td>
        </tr>
        <tr>
            <th>Conflitos de interesse</th>
            <td>${conflitos}</td>
        </tr>
        <!-- Linhas mais escuras -->
        <tr class="dark">
            <th>Síntese da análise</th>
            <td>${sintese}</td>
            <th class="rotate dark" rowspan="8">ETAPA DA CLASSIFICAÇÃO</th>
        </tr>
        <tr class="dark">
            <th style="font-weight: bold;">A evidência</th>
            <td></td>
        </tr>
        <tr class="dark">
            <th style="text-align: center;">Fortalece a compreensão</th>
            <td>${fort}</td>
        </tr>
        <tr class="dark">
            <th style="text-align: center;">Não altera a compreensão</th>
            <td>${nalt}</td>
        </tr>
        <tr class="dark">
            <th style="text-align: center;">Enfraquece a compreensão</th>
            <td>${enf}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bolder;">RELEVÂNCIA (R)</th>
            <td>${relevancia}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bolder;">COBERTURA (C)</th>
            <td>${cobertura}</td>
        </tr>
        <tr class="dark">
            <th style="font-weight: bolder;">FORÇA (F)</th>
            <td>${forca}</td>
        </tr>
        <!-- Linhas mais claras -->
        <tr>
            <th style="font-weight: bolder;">GRAU DO PERIGO (GP)</th>
            <td>${perigo}</td>
            <th class="rotate" rowspan="4">ETAPA<BR>DO CÁLCULO<BR>DA RELEVÂNCIA</th>
        </tr>
        <tr>
            <th style="font-weight: bolder;">PROBABILIDADE DE FALHAS (PF)</th>
            <td>${falha}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">SELO DA EVIDÊNCIA</th>
            <td>${selo}</td>
        </tr>
        <tr>
            <th style="font-weight: bolder;">CLASSIFICAÇÃO DA EVIDÊNCIA</th>
            <td style="font-weight: bolder;">${classificacao}</td>
        </tr>
        <!-- Linha mais escura -->
        <tr class="dark">
            <th style="font-weight: bolder;">AVALIADOR</th>
            <td colspan="2">${avaliador}</td>
        </tr>
            </table>
        </body>
    </html>
    `;
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
};
