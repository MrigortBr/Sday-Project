module.exports = new class User {
    /**
     * Informa que ocorreu um erro desconhecido.
     * Código de erro: 500
     */
    async unknownError() {
        return {
            status: false,
            message: "Aconteceu um erro interno. Entre em contato com o suporte ou tente logar novamente.",
            code: 500
        };
    }

    /**
     * Informa que o email é inválido.
     * Código de erro: 404
     */
    invalidEmail() {
        return {
            status: false,
            message: "Email inválido. Tente mudar o email.",
            code: 404
        };
    }

    /**
     * Informa que o email já está em uso.
     * Código de erro: 404
     */
    emailInUse() {
        return {
            status: false,
            message: "Email já está em uso.",
            code: 404
        };
    }

    /**
     * Informa que a data de nascimento enviada é inválida.
     * Código de erro: 400
     */
    invalidBirth() {
        return {
            status: false,
            message: "Data de nascimento inválida.",
            code: 400
        };
    }

    /**
     * Informa que a senha é inválida.
     * Código de erro: 404
     */
    invalidPassword() {
        return {
            status: false,
            message: "Senha inválida. Tente inserir outra senha.",
            code: 404
        };
    }

    /**
     * Informa que os campos não foram preenchidos.
     * Código de erro: 404
     */
    unfilledFields() {
        return {
            status: false,
            message: "Campos não preenchidos.",
            code: 404
        };
    }

    /**
     * Informa que os campos enviados são inválidos.
     * Código de erro: 404
     */
    invalidFields() {
        return {
            status: false,
            message: "Campos inválidos.",
            code: 404
        };
    }

    /**
     * Informa que o login foi realizado com sucesso (para o sistema).
     * Código de erro: 200
     */
    validLogin(token) {
        return {
            status: true,
            token: token,
            code: 200
        };
    }

    /**
     * Informa que o email enviado já está cadastrado.
     * Código de erro: 404
     */
    emailExists() {
        return {
            status: false,
            message: "O email já está registrado.",
            code: 404
        };
    }

    /**
     * Informa que o usuário foi registrado com sucesso.
     * Código de erro: 200
     */
    successRegister() {
        return {
            status: true,
            message: "Usuário registrado com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que o usuário deve sair de todos os projetos para poder deletar a conta.
     * Código de erro: 400
     */
    leaveForDelete() {
        return {
            status: false,
            message: "Você deve sair de todos os projetos em que está incluso para apagar a conta.",
            code: 400
        };
    }

    /**
     * Informa que a conta do usuário foi apagada com sucesso.
     * Código de erro: 200
     */
    successDelete() {
        return {
            status: true,
            message: "Sua conta foi apagada com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que a conta do usuário foi atualizada com sucesso.
     * Código de erro: 200
     */
    successUpdate(data) {
        return {
            status: true,
            jwtKey: data,
            message: "Sua conta foi atualizada com sucesso.",
            code: 200
        };
    }
};
