const fs = require("fs");
const path = require('path');

const professoresVerif = [
    {
        "nome": "Renato Zampa",
        "email": 'renato@gmail.com',
        "senha": "zampa"
    }
]

function verificaLogin(email, senha) {
    return professoresVerif.some(
        (prof) => prof.email === email && prof.senha === senha
    );
}

function login(email, senha) {
    if (!email || !senha) {
        throw new Error("Email e senha devem estar preenchidos");
    }

    const isValid = verificaLogin(email, senha);
    
    if (!isValid) {
        throw new Error("Esse usuário não é verificado!");
    }
    return true;
}



function listarQuestoes() {
    const filePath = path.join(__dirname, '../dataBase/listaQuestoes.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function buscarQuestaoPorId(id) {
    const lista = listarQuestoes();
    return lista.find(q => q.id == id);
}



module.exports = { login, listarQuestoes, buscarQuestaoPorId }