import * as Yup from 'yup';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import File from '../models/File';
import Mail from '../../lib/Mail';

class PackageController {
    async index(req, res) {
        const { page = 1 } = req.query;

        const packages = await Package.findAll({
            where: { canceled_at: null },
            order: ['start_date'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'product', 'start_date', 'end_date'],
            include: [
                {
                    model: Courier,
                    as: 'courier',
                    attributes: ['id', 'name', 'email'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'url', 'path'],
                        },
                    ],
                },
                {
                    model: File,
                    as: 'signature',
                    attributes: ['name', 'path'],
                },
                {
                    model: Recipient,
                    as: 'recipient',
                    attributes: [
                        'id',
                        'name',
                        'address_number',
                        'address_complement',
                        'state',
                        'city',
                        'cep',
                    ],
                },
            ],
        });

        return res.json(packages);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number()
                .integer()
                .positive()
                .required(),
            courier_id: Yup.number()
                .positive()
                .integer()
                .required(),
            product: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const courier = await Courier.findByPk(req.body.courier_id);
        if (!courier) {
            return res.status(400).json({ error: 'courier does no exist' });
        }

        const recipient = await Recipient.findByPk(req.body.recipient_id);
        if (!recipient) {
            return res.status(400).json({ error: 'recipient does no exist' });
        }

        const delivery = await Package.create(req.body);

        // envia um email para o entregador responsável.

        await Mail.sendMail({
            to: `${courier.name} <${courier.email}>`,
            subject: 'Você tem uma nova encomenda',
            template: 'newPackage',
            context: {
                dest: recipient.name,
                address: recipient.address,
                address_number: recipient.address_number,
                address_complement: recipient.address_complement,
                city: recipient.city,
                state: recipient.state,
                cep: recipient.cep,
            },
        });

        return res.json(delivery);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number()
                .integer()
                .positive()
                .required(),
            courier_id: Yup.number()
                .positive()
                .integer()
                .required(),
            product: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const courierExists = await Courier.findByPk(req.body.courier_id);
        if (!courierExists) {
            return res.status(400).json({ error: 'courier does no exist' });
        }

        const recipientExists = await Recipient.findByPk(req.body.recipient_id);
        if (!recipientExists) {
            return res.status(400).json({ error: 'recipient does no exist' });
        }

        const pk = req.params.id;

        const delivery = await Package.findByPk(pk);
        if (!delivery) {
            return res.status(400).json({ error: 'delivery does not exist' });
        }

        const {
            id,
            courier_id,
            recipient_id,
            signature_id,
            product,
        } = await delivery.update(req.body);

        return res.json({
            id,
            courier_id,
            recipient_id,
            signature_id,
            product,
        });
    }

    async destroy(req, res) {
        const pk = req.params.id;

        const delivery = await Package.findByPk(pk);
        if (!delivery) {
            return res.status(400).json({ error: 'delivery does not exist' });
        }

        const packageDestroyed = await Package.destroy({
            where: {
                id: pk,
            },
        });

        return res.json(packageDestroyed);
    }
}

export default new PackageController();
