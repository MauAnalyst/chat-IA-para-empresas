const express = require('express');
const { geraResp } = require('./main');
const path = require('path'); // Necessário para lidar com o caminho dos arquivos estáticos
const app = express();

app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo HTML quando acessar /home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/home', async (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ error: 'Pergunta não fornecida' });
    }

    try {
        //const dadosExcel = await lerExcel('./chamados_sgr.xlsx');
        const resposta = await geraResp(pergunta); // Função para lidar com IA
        res.json({ resposta });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar a pergunta' });
    }
});

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
