const { GoogleGenerativeAI } = require("@google/generative-ai");
const xlsx = require('xlsx');
const fs = require('fs');
const { join } = require("path");
require('dotenv').config();

// Inicializa o modelo da Google Generative AI
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey); //sua chave aqui


// Função para criar o prompt usando o conteúdo de um arquivo txt
function createPrompt(questao, dadosTxt) {
    return `vocé uma assistente de suporte sistemas. Para respoder a pergunta: ${questao}, utilize essa base:\n ${dadosTxt} \n Lembre-se de responder apenas o que foi perguntado, seja breve se possível, eviste respostas muitos grandes a não ser que seja necessário. Quem irá receber essa respostas será o JS + html, então utilize respostas com /n, <bold><bold>, e etc.`;
}


// Função principal para gerar a resposta
async function Retorno(pergunta,dadosTxt) {
    const prompt = createPrompt(pergunta, dadosTxt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    //console.log(result.response.text());
    return result.response.text();
}

// Ler o arquivo .txt e executar o modelo
/*async function geraResp(pergunta){
    fs.readFile('./transfEqualizacao.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        // Passar o conteúdo do arquivo .txt para a função Retorno
        //console.log(typeof data)
        //console.log(JSON.stringify(data))
        const resp = Retorno(pergunta, data);
        return resp;
    });
} */

    // Ler o arquivo .txt e executar o modelo
async function geraResp(pergunta) {
    try {
        const data = await fs.promises.readFile('./transfEqualizacao.txt', 'utf8');
        const resp = await Retorno(pergunta, data); // Certifique-se de aguardar o resultado
        return resp;
    } catch (err) {
        console.error(err);
        return 'Erro ao ler o arquivo ou gerar resposta';
    }
}


module.exports = { geraResp };


