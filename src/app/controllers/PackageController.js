import * as Yup from 'yup';
import Package from '../models/Package';
import Recipient from '../models/Recipient';
import Courier from '../models/Courier';

class PackageController {
    async index(req, res) {
        return res.json();
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

        const courierExists = await Courier.findByPk(req.body.courier_id);
        if (!courierExists) {
            return res.status(400).json({ error: 'courier does no exist' });
        }

        const recipientExists = await Recipient.findByPk(req.body.courier_id);
        if (!recipientExists) {
            return res.status(400).json({ error: 'recipient does no exist' });
        }

        const delivery = await Package.create(req.body);

        return res.json(delivery);
    }
}

export default new PackageController();
