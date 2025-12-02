const express = require("express");
const path = require("path");
const { login, listarQuestoes, buscarQuestaoPorId, adicionarQuestao, atualizarQuestao, listarQuestoesPorMateria} = require("./lib/library");
const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.render("home")
});
app.get('/questoes', (req, res) => {
    const lista = listarQuestoes();
    res.render("questoes", { lista, feedback: null });
});
app.get('/categorias', (req, res) => {
    res.status(200).render("categorias")
})
app.get('/login', (req, res) => {
    res.render("login", { msg: null });
})
app.get("/questoesProfessor", (req, res) => { 
    res.status(200).render('questoesProfessor', {lista : listarQuestoes()})
})
app.get("/formQuestao", (req, res) => { 
    res.status(200).render("formQuestao")
})
app.get("/editarQuestao/:id", (req, res) => {
    const id = req.params.id;
    const questao = buscarQuestaoPorId(id);
    if (!questao) {
        return res.status(404).send("Questão não encontrada!");
    }
    res.render("formEditarQuestao", { questao });
});
app.get("/categorias", (req, res) => {
    res.render("categorias"); 
});


app.post('/fazerLogin', (req, res) => { 
    const {email, senha} = req.body 
    try { 
        login(email, senha)
        return res.redirect("/questoesProfessor")
    } catch(erro) { 
        return res.render("login", { msg: erro.message }); 
    }
    
})

app.post('/responderQuestao', (req, res) => {
    const { idQuestao, resposta } = req.body;

    const questao = buscarQuestaoPorId(idQuestao);
    const lista = listarQuestoes();

    if (!questao) {
        return res.render("questoes", { lista, feedback: null });
    }

    const feedback = {
        idQuestao: questao.id,
        escolhido: resposta,
        correta: questao.correta,
        acertou: resposta === questao.correta,
        explicacao: questao.explicacao
    };

    res.render("questoes", { lista, feedback });
});

app.post("/criarQuestao", (req, res) => {
    const {
        enunciado,
        materia,
        tema,
        altA,
        altB,
        altC,
        altD,
        altE,
        correta,
        explicacao
    } = req.body;

    const novaQuestaoDados = {
        enunciado,
        materia,
        tema,
        altA,
        altB,
        altC,
        altD,
        altE,
        correta,
        explicacao
    }
    adicionarQuestao(novaQuestaoDados);

    res.redirect("/questoesProfessor");

});

app.post("/editarQuestao/:id", (req, res) => {
    const id = req.params.id;
    const {
        enunciado,
        materia,
        tema,
        altA,
        altB,
        altC,
        altD,
        altE,
        correta,
        explicacao
    } = req.body;

    const dadosAtualizados = {
        enunciado,
        materia,
        tema,
        altA,
        altB,
        altC,
        altD,
        altE,
        correta,
        explicacao
    };

    atualizarQuestao(id, dadosAtualizados);

    res.redirect("/questoesProfessor");
});

app.get("/api/questoes", (req, res) => {
    const { materia } = req.query;

    try {
        const lista = listarQuestoesPorMateria(materia);
        res.json(lista);
    } catch (err) {
        console.error("Erro na API de questões:", err);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})