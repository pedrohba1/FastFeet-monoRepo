import axios from 'axios';

// essa rota foi criada apenas com o intuito de melhorar a experiência do usuário
// poderia ter usado a requisição diretamente do frontend, mas aí eu não teria a tratativa de erros
class CepController {
    async show(req, res) {
        const { data } = await axios.get(
            `https://viacep.com.br/ws/${req.body.cep}/json/`
        );
        res.json(data);
    }
}

export default new CepController();
