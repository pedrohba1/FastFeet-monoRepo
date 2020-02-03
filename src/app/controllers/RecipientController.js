import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string().required(),
            address_number: Yup.string().required(),
            address_complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            cep: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail, invalid json',
            });
        }

        const data = await Recipient.create(req.body);
        return res.json(data);
    }

    async update(req, res) {
        //fica pra depois como eu vou fazer a atualização desse campo

        return res.json({ msg: 'teste' });
    }
}

export default new RecipientController();
