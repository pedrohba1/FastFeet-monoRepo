import { format, parseISO } from 'date-fns';

import PackageLimit from '../schemas/PackageLimit';
import Package from '../models/Package';

class DeliveryController {
    async addStart(req, res) {
        const { package_id, courier_id } = req.body;
        const delivery = await Package.findByPk(package_id);

        let { reqDate } = req.body;
        // essa linha abaixo é só para propósitos de teste,
        // remover quando for para a aplicação
        reqDate = reqDate ? parseISO(reqDate) : new Date();

        if (delivery.courier_id !== courier_id) {
            return res.json({
                error: `this package doesn't belong to this courier`,
            });
        }
        if (delivery.start_date !== null) {
            return res.json({
                error: 'this delivery already has a start date',
            });
        }

        let limiter = await PackageLimit.findOne({ courierId: courier_id });
        if (!limiter) {
            limiter = await PackageLimit.create({
                courierId: courier_id,
                packagesTakenIds: [],
                takenDate: reqDate,
            });
        }

        const date1 = format(reqDate, 'dd/MM/yyyy');
        const date2 = format(limiter.takenDate, 'dd/MM/yyyy');

        if (date1 === date2) {
            if (limiter.packagesTakenIds.length === 5) {
                return res.json({
                    error: 'this courier is trying to exceed the limit',
                });
            }
            const array = limiter.packagesTakenIds;
            array.push(package_id);
            await limiter.update({
                packagesTakenIds: array,
            });
        } else {
            await limiter.update({
                packagesTakenIds: [package_id],
                takenDate: reqDate,
            });
        }

        await delivery.update({ start_date: reqDate });

        return res.json(delivery);
    }

    async addEnd(req, res) {
        return res.json();
    }
}

export default new DeliveryController();
