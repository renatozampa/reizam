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


module.exports = { login }