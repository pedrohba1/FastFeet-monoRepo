/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Courier from '../models/Courier';

class CourierController {
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
        res.json();
    }
}

export default new CourierController();
