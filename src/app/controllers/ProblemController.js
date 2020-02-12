import DeliveryProblem from '../models/DeliveryProblem.js';
import Package from '../models/Package';

class ProblemController {
    async store(req, res) {
        const { package_id, description } = req.body;
        if (!(await Package.findByPk(package_id))) {
            return res.status(400).json({
                error: 'package does not exist',
            });
        }

        const problem = await DeliveryProblem.create({
            package_id,
            description,
        });

        return res.json(problem);
    }

    async destroy(req, res) {
        return res.json();
    }

    async index(req, res) {
        const { packageId } = req.params;

        const delivery = await Package.findByPk(packageId);
        if (!delivery) {
            return res.json({ error: 'package does not exist' });
        }

        const problem = await DeliveryProblem.findOne({
            where: {
                package_id: packageId,
            },
        });

        if (!problem) {
            return res.json({
                error: `no problems with package from id = ${packageId}`,
            });
        }

        return res.json(problem);
    }

    async show(req, res) {
        return res.json();
    }
}

export default new ProblemController();
