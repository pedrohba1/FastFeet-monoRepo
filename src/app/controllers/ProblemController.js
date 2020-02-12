import Courier from '../models/Courier';
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
        return res.json();
    }

    async show(req, res) {
        return res.json();
    }
}

export default new ProblemController();
