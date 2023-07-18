module.exports = new class Project {
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
     * Informa que o dono nao pode sair do projeto
     * Código de erro: 500
     */

    async notLeave() {
        return {
            status: false,
            message: "O Dono nao pode sair do projeto",
            code: 500
        };
    }

    /**
     * Informa que pode apenas ter um unico dono.
     * Código de erro: 500
     */
        async noUpdate() {
            return {
                status: false,
                message: "Não pode exister mais de uma dono do projeto.",
                code: 500
            };
        }

    /**
     * Informa que há campos vazios no projeto.
     * Código de erro: 500
     */
    async unfilledFields(emptyFields) {
        return {
            status: false,
            message: `${emptyFields.join(' e ')} vazios.`,
            code: 500
        };
    }
    
    /**
     * Informa que não foi encontrado nenhum projeto com o código fornecido.
     * Código de erro: 404
     */
    async projectNotFound() {
        return {
            status: false,
            message: "Não existe projeto com esse código.",
            code: 404
        };
    }

    /**
     * Informa que o usuário não está associado ao projeto.
     * Código de erro: 404
     */
    async userNotInProject() {
        return {
            status: false,
            message: "O usuário não está nesse projeto.",
            code: 404
        };
    }

    /**
     * Informa que não foi encontrada nenhuma tarefa com o código fornecido.
     * Código de erro: 404
     */
    async taskNotFound() {
        return {
            status: false,
            message: "Não existe tarefa com esse código.",
            code: 404
        };
    }

    /**
     * Informa que a data enviada é inválida.
     * Código de erro: 404
     */
    async invalidDate() {
        return {
            status: false,
            message: "A data enviada é inválida.",
            code: 404
        };
    }

    /**
     * Informa que o usuário não tem permissão para acessar a página.
     * Código de erro: 404
     */
    async noPermission() {
        return {
            status: false,
            message: "Você não tem permissão para acessar essa página.",
            code: 404
        };
    }

    /**
     * Informa que os dados enviados são inválidos.
     * Código de erro: 400
     */
    async dataInvalid() {
        return {
            status: false,
            message: "Dados enviados inválidos. Tente reiniciar a página e enviar novamente.",
            code: 400
        };
    }

    /**
     * Retorna um link de convite para o projeto.
     * Código de erro: 200
     */
    async invite(link) {
        return {
            status: true,
            message: "Link de convite copiado para área de transferência.",
            link: `http://127.0.0.1:8081/projects/${link}`,
            code: 200
        };
    }






    /**
     * Retorna os usuarios do projeto
     * Código de erro: 200
     */
    async successUsers(data) {
        return {
            status: true,
            data: data,
            code: 200
        };
    }

    /**
     * Informa que o projeto foi criado com sucesso.
     * Código de erro: 200
     */
    async successCreate() {
        return {
            status: true,
            message: "Projeto criado com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que a operação na tarefa foi concluída com sucesso.
     * Código de erro: 200
     */
    async successTask(current, task) {
        return {
            status: true,
            data: { current: current, task: task },
            code: 200
        };
    }

    /**
     * Informa que o projeto foi atualizado com sucesso.
     * Código de erro: 200
     */
    async successUpdate() {
        return {
            status: true,
            message: "Projeto atualizado com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que o projeto foi criado com sucesso.
     * Código de erro: 200
     */
    async successCreate() {
        return {
            status: true,
            message: "Projeto criado com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que o projeto foi excluído com sucesso.
     * Código de erro: 200
     */
    async successDelete() {
        return {
            status: true,
            message: "Projeto deletado com sucesso.",
            code: 200
        };
    }

    /**
     * Informa que a tarefa foi excluída com sucesso.
     * Código de erro: 200
     */
    async successDeleteTask() {
        return {
            status: true,
            message: "Tarefa deletada com sucesso.",
            code: 200
        };
        }

    /**
     * Informa que a subtarefa foi concluída com sucesso.
     * Código de erro: 200
     */
    async successFinish() {
        return {
            status: true,
            message: "Subtarefa finalizada com sucesso.",
            code: 200
        };
    }

    /**
     * Retorna a data de sucesso com os dados fornecidos.
     * Código de erro: 200
     */
    async successDate(data) {
        return {
            status: true,
            data: data,
            code: 200
        };
    } 

    /**
     * Retorna os projetos do usuario.
     * Código de erro: 200
     */
    async listProjects(data){
        return {
            status: true,
            data: data,
            code: 200
        };
    }

    /**
     * Informa que o usuario está no projeto.
     * Código de erro: 200
     */
    async userInProject(){
        return{
            status: true,
            message: "Você ja está neste projeto.",
            code:200
        }
    }

    
    /**
     * Informa que o usuario entrou no projeto.
     * Código de erro: 200
     */
    async successEnter(){
        return{
            status: true,
            message: "Você entrou no projeto.",
            code:200
        }
    }

    /**
     * Informa que o usuario foi promovido com sucesso.
     * Código de erro: 200
     */
    async successPromote(){
        return{
            status: true,
            message: "Usuario promovido com sucesso",
            code:200
        }
    }

        /**
     * Informa que o usuario foi removido com sucesso.
     * Código de erro: 200
     */
        async successRemove(){
            return{
                status: true,
                message: "Usuario removido com sucesso",
                code:200
            }
        }

    /**
     * Informa que o usuario saiu do projeto com sucesso.
     * Código de erro: 200
     */
    async successLeave(){
        return{
            status: true,
            message: "Você acabou de sair para o projeto! você pode voltar atraves do link.",
            code:200
        }
    }
};
