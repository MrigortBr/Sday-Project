module.exports = new class KeyClass {
    // Informa ao usuário que há um problema com o seu login (chave JWT inválida ou ausente)
    emptyKey() {
        return {
            status: false,
            message: "Os parâmetros de login estão inválidos. Faça o login novamente.",
            code: 400
        };
    }

    // Informa ao usuário que há um problema com o seu login (chave JWT inválida)
    invalidKey() {
        return {
            status: false,
            message: "Os parâmetros de login são inválidos. Faça o login novamente.",
            code: 404
        };
    }

    // Informa ao sistema que a chave é válida e envia a chave
    keyValid(data) {
        return {
            status: true,
            data: data,
            code: 200
        };
    }

    // Informa que ocorreu um erro desconhecido ao tentar realizar o login
    unknownError() {
        return {
            status: false,
            message: "Erro ao validar o login. Tente novamente mais tarde.",
            code: 500
        };
    }
};
