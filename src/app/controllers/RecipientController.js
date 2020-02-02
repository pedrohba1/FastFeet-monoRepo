import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import axios from 'axios';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
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

        return res.json({ msg: 'deubom' });
    }
}

export default new RecipientController();
