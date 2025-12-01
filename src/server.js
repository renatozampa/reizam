const express = require("express");
const path = require("path")
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
    res.status(200).render("questoes")
})
app.get('/categorias', (req, res) => {
    res.status(200).render("categorias")
})
app.get('/login', (req, res) => {
    res.status(200).render("login")
})



app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`)
})