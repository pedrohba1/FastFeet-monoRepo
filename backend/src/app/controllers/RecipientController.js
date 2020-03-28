import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const { name = '', page = 1 } = req.query;

        const recipients = await Recipient.findAll({
            where: {
                name: { [Op.like]: `${name}%` },
            },
            order: ['id'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: [
                'id',
                'name',
                'address',
                'address_complement',
                'state',
                'city',
                'cep',
            ],
        });

        return res.json(recipients);
    }

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

        const recipient = await Recipient.create(req.body);
        return res.json(recipient);
    }

    async update(req, res) {
        // TODO Você precisa terminar o update de recipient
        const schema = Yup.object().shape({
            name: Yup.string(),
            address: Yup.string(),
            address_number: Yup.string(),
            address_complement: Yup.string(),
            state: Yup.string(),
            city: Yup.string(),
            cep: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail, invalid json',
            });
        }

        return res.json({ msg: 'teste' });
    }
}

export default new RecipientController();
