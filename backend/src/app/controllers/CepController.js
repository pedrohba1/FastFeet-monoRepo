import axios from 'axios';

class CepController {
    async show(req, res) {
        const { data } = await axios.get(
            `https://viacep.com.br/ws/${req.body.cep}/json/`
        );

        res.json(data);
    }
}

export default new CepController();
