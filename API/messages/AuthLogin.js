module.exports = new class AuthLogin {
    /**
     * Response para quando o usuário não tem permissão para acessar a página.
     * Código de erro: 403
     */
    noPermission() {
        return {
            status: false,
            message: "Você não tem permissão para abrir essa página.",
            code: 403
        };
    }

    /**
     * Response que informa o usuário que sua autenticação é inválida.
     * Código de erro: 400
     */
    invalidAuthentication() {
        return {
            status: false,
            message: "Autenticação inválida. Realize login novamente.",
            code: 400
        };
    }
};
