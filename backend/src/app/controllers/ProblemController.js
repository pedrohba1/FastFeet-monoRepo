import DeliveryProblem from '../models/DeliveryProblem';
import Package from '../models/Package';

class ProblemController {
    async store(req, res) {
        const { package_id, description } = req.body;
        if (!(await Package.findByPk(package_id))) {
            return res.status(400).json({
                error: 'package does not exist',
            });
        }

        if (await DeliveryProblem.findOne({ where: { package_id } })) {
            return res.json({ error: 'this package already has a problem' });
        }
        const problem = await DeliveryProblem.create({
            package_id,
            description,
        });

        return res.json(problem);
    }

    async destroy(req, res) {
        const { delivery_problem_id } = req.params;

        const problem = await DeliveryProblem.findByPk(delivery_problem_id);

        if (!problem) {
            return res.json({ error: 'package does not have a problem' });
        }

        const { package_id } = problem;
        const delivery = await Package.findByPk(package_id);
        await delivery.update({ canceled_at: new Date() });

        return res.json(delivery);
    }

    async index(req, res) {
        const problems = await DeliveryProblem.findAll();
        return res.json(problems);
    }

    async show(req, res) {
        const { package_id } = req.params;

        const problem = await DeliveryProblem.findOne({
            where: { package_id },
        });

        if (!problem) {
            return res.json({ error: 'package does not have a problem' });
        }

        return res.json(problem);
    }
}

export default new ProblemController();
