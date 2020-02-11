import { format } from 'date-fns';

import PackageLimit from '../schemas/PackageLimit';
import Package from '../models/Package';

class DeliveryController {
    async addStart(req, res) {
        const { package_id, courier_id, reqDate = new Date() } = req.body;

        const delivery = await Package.findByPk(package_id);

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

        if (limiter.packagesTakenIds.length === 5) {
            return res.json({
                error: 'this courier is trying to exceed the limit',
            });
        }

        const date1 = format(reqDate, 'dd/MM/yyyy');
        const date2 = format(limiter.takenDate, 'dd/MM/yyyy');

        if (date1 === date2) {
            let array = limiter.packagesTakenIds;
            array.push(package_id);
            await limiter.update({
                packagesTakenIds: array,
            });
        } else {
            await limiter.update({
                packagesTakenIds: [],
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
