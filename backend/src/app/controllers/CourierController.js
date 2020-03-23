/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import { Op } from 'sequelize';

import Courier from '../models/Courier';
import File from '../models/File';
import Package from '../models/Package';

class CourierController {
    async index(req, res) {
        const { page = 1, name = '' } = req.query;

        const couriers = await Courier.findAll({
            where: {
                name: { [Op.like]: `${name}%` },
            },
            order: ['name'],
            limit: 20,
            offset: (page - 1) * 20,
            attributes: ['id', 'name', 'email'],
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['url', 'path', 'id'],
                },
            ],
        });

        return res.json(couriers);
    }

    // TODO: essas duas rotas podem ser convertidas em um simples index no packageController,
    // passando no req.query e algum parametro para checar se end_date não é nula

    /*  async listPackages(req, res) {
        const { id } = req.params;

        if (!(await Courier.findByPk(id))) {
            return res.status(400).json({
                error: 'courier does not exist',
            });
        }

        const packages = await Package.findAll({
            where: {
                courier_id: id,
                end_date: null,
                canceled_at: null,
            },
        });

        return res.json(packages);
    }

    async deliveredPackages(req, res) {
        const { id } = req.params;
        if (!(await Courier.findByPk(id))) {
            return res.status(400).json({
                error: 'courier does not exist',
            });
        }

        const packages = await Package.findAll({
            where: {
                courier_id: id,
                end_date: { [Op.ne]: null },
            },
        });

        return res.json(packages);
    }
 */
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'validation fail',
            });
        }

        const CourierExists = await Courier.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (CourierExists) {
            return res.status(400).json({
                error: 'user already exists',
            });
        }

        const { id, name, email, avatar_id } = await Courier.create(req.body);

        return res.json({
            id,
            name,
            email,
            avatar_id,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            avatar_id: Yup.number()
                .positive()
                .integer(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: 'invalid json',
            });
        }

        const pk = req.params.id;

        const courier = await Courier.findByPk(pk);
        if (!courier) {
            return res.status(400).json({ error: 'courier does not exist' });
        }

        const avatarExists = await File.findByPk(req.body.avatar_id);

        if (!avatarExists) {
            return res.status(400).json({ error: 'avatar does not exist' });
        }

        const { id, name, avatar_id, email } = await courier.update(req.body);

        return res.json({ id, name, avatar_id, email });
    }

    async destroy(req, res) {
        const pk = req.params.id;

        const courierExists = await Courier.findByPk(pk);

        if (!courierExists) {
            return res.status(400).json({ error: 'courier does not exist' });
        }

        const courierDestroyed = await Courier.destroy({ where: { id: pk } });
        return res.json(courierDestroyed);
    }
}

export default new CourierController();
