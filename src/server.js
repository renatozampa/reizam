const express = require("express");
const path = require("path");
const { login, listarQuestoes } = require("./lib/library");
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
    res.status(200).render("questoes", { lista : listarQuestoes() })
})
app.get('/categorias', (req, res) => {
    res.status(200).render("categorias")
})
app.get('/login', (req, res) => {
    res.render("login", { msg: null });
})
app.get("/questoesProfessor", (req, res) => { 
    res.status(200).render('questoesProfessor', {lista : listarQuestoes()})
})


app.post('/fazerLogin', (req, res) => { 
    const {email, senha} = req.body 
    try { 
        login(email, senha)
        return res.redirect("/questoesProfessor")
    } catch(erro) { 
        return res.render("login", { msg: erro.message }); 
    }
    
})


app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})