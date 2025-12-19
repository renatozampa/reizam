const fs = require("fs");
const path = require('path');
const filePath = path.join(__dirname, '../database/listaQuestoes.json');


const FileRepository = {
    ler: () => JSON.parse(fs.readFileSync(filePath, 'utf-8')),
    salvar: (dados) => fs.writeFileSync(filePath, JSON.stringify(dados, null, 4), "utf-8")
};

const professoresVerif = [
    {
        "nome": "Renato Zampa",
        "email": 'renato@gmail.com',
        "senha": "zampa"
    }
];

function normalizarQuestao(questao) {
    if (questao.correta && typeof questao.correta === 'string') {
        questao.correta = questao.correta.toUpperCase();
    }
    return questao;
}

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
    return FileRepository.ler();
}

function buscarQuestaoPorId(id) {
    const lista = listarQuestoes();
    return lista.find(q => q.id == id);
}

function salvarQuestoes(lista) {
    FileRepository.salvar(lista);;
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
    lista.push(normalizarQuestao(novaQuestao)); 
    salvarQuestoes(lista);

    return novaQuestao;
}

function atualizarQuestao(id, dadosAtualizados) {
    const lista = listarQuestoes();
    const index = lista.findIndex(q => q.id == id);

    if (index === -1) {
        throw new Error("Questão não encontrada");
    }

    lista[index] = normalizarQuestao({
        ...lista[index],
        ...dadosAtualizados
    });

    salvarQuestoes(lista)
}


function listarQuestoesPorMateria(materia) {
    const lista = listarQuestoes();
    
    if (!materia) {
        return lista;
    }

    const materiaBuscada = materia.toLowerCase().trim();
    
    return lista.filter(questao => {
        const materiaQuestao = (questao.materia || "").toLowerCase().trim();
        return materiaQuestao === materiaBuscada;
    });
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
