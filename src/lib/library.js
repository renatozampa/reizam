const fs = require("fs");
const path = require('path');
const filePath = path.join(__dirname, '../dataBase/listaQuestoes.json');

const professoresVerif = [
    {
        "nome": "Renato Zampa",
        "email": 'renato@gmail.com',
        "senha": "zampa"
    }
];

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
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function buscarQuestaoPorId(id) {
    const lista = listarQuestoes();
    return lista.find(q => q.id == id);
}

function salvarQuestoes(lista) {
    fs.writeFileSync(filePath, JSON.stringify(lista, null, 4), "utf-8");
    return true;
}


function gerarNovoID() {
    const lista = listarQuestoes();
    if (lista.length === 0) return 1;

    const ultimoId = lista[lista.length - 1].id;
    return ultimoId + 1;
}

function adicionarQuestao(novaQuestao) {
    const lista = listarQuestoes();


    novaQuestao.id = gerarNovoID();

    if (novaQuestao.correta)
        novaQuestao.correta = novaQuestao.correta.toUpperCase();

    lista.push(novaQuestao);

    salvarQuestoes(lista);

    return novaQuestao;
}

function atualizarQuestao(id, dadosAtualizados) {
    const lista = listarQuestoes();

    const index = lista.findIndex(q => q.id == id);
    if (index === -1) {
        throw new Error("Questão não encontrada");
    }

    // Mantém o ID original e substitui o restante
    lista[index] = {
        ...lista[index],
        ...dadosAtualizados,
    };

    fs.writeFileSync(filePath, JSON.stringify(lista, null, 2), "utf-8");
}


function listarQuestoesPorMateria(materia) {
    const lista = listarQuestoes();

    // Se não veio materia: retorna tudo
    if (!materia) return lista;

    const materiaFormatada = materia.toLowerCase();

    return lista.filter(q =>
        (q.materia || "").toLowerCase() === materiaFormatada
    );
}




module.exports = { 
    login,
    listarQuestoes,
    buscarQuestaoPorId,
    salvarQuestoes,
    gerarNovoID,
    adicionarQuestao,
    atualizarQuestao,
    listarQuestoesPorMateria
};
