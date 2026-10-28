const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

let agendamentosMock = [];

app.post('/verificar-horario', (req, res) => {
  const { diaSemana, hora } = req.body;
  if (diaSemana?.toLowerCase() === 'domingo') {
    return res.json({ disponivel: false, mensagem: 'A barbearia está fechada ao domingo.' });
  }
  if (hora >= '12:00' && hora < '13:00') {
    return res.json({ disponivel: false, mensagem: 'Horário indisponível! Almoço das 12:00 às 13:00.' });
  }
  if (hora < '09:00' || hora >= '19:00') {
    return res.json({ disponivel: false, mensagem: 'Fora do horário de expediente (09:00 às 19:00).' });
  }
  return res.json({ disponivel: true, mensagem: 'Horário disponível para agendamento!' });
});

app.post('/agendar', (req, res) => {
  const { nome, telefone, diaSemana, hora } = req.body;
  agendamentosMock.push({ id: Date.now(), nome_cliente: nome, telefone, dia_semana: diaSemana, hora });
  res.json({ sucesso: true, mensagem: 'Agendamento realizado com sucesso!' });
});

app.get('/agendamentos', (req, res) => {
  res.json(agendamentosMock);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
