import {
	NextFunction,
	Request,
	Response,
	Router
} from 'express';
import axios from '../utilities/axios';
import {
	FormModel
} from '../models/form';
import {
	Submission
} from '../models/submission';
import {
	FilterClauseType
} from '../models/filter';
import { convertValueFromType } from '../utilities/convert';

const router: Router = Router();

interface FormRequest extends Request < any, any, any, {
	filters: FilterClauseType[];
    offset?: string;
    limit?: string;
} > {
	form: FormModel;
	submissions: Submission;
}

const fetchSubmissions = async (id: string, results: Submission[], offset: number, limit: number = 150) => {
	const response = await axios.get(`/forms/${id}/submissions?offset=${offset}&limit=${limit}`);
	const submissions: Submission = response.data;
	results.push(submissions);
	if (submissions.pageCount - 1 > Math.floor(offset / limit)) {
		await fetchSubmissions(id, results, offset + limit, limit);
	}
}

// @ts-ignore
router.param('form', async (req: FormRequest, res: Response, next: NextFunction, id) => {
	try {
		const form = await axios.get(`/forms/${id}`);
		req.form = form.data;

		const submissions: Submission[] = [];
		await fetchSubmissions(id, submissions, 0);
		if (submissions.length > 0) {
			req.submissions = submissions.reduce((acc, cur) => {
				if (!acc) {
					return cur;
				}
				return {
					...acc,
					responses: [
						...acc.responses,
						...cur.responses
					]
				}
			}, null);
		}

		return next();
	} catch (error) {
		return next(error);
	}
});

router.get('/:form/filteredResponses', async (req: FormRequest, res: Response) => {
	const {
		filters,
        offset = '0',
        limit = '10',
	} = req.query;
    const _offset = parseInt(offset);
    const _limit = parseInt(limit);

	if (filters && filters.length > 0) {
		const _filters = filters.map(filter => {
			const question = req.form.questions.find(question => question.id === filter.id);
			const type = question?.type;
			return {
				...filter,
				type
			};
		}).filter(question => !!question.type);
		const responses = req.submissions.responses.filter(response => _filters.filter(filter => {
            let flag = false;
			response.questions.forEach(question => {
				if (filter.id === question.id && filter.type === question.type) {
					switch (filter.condition) {
						case 'equals':
							flag = convertValueFromType(filter.value, filter.type) === convertValueFromType(question.value, question.type);
                            return;
						case 'does_not_equal':
							flag = convertValueFromType(filter.value, filter.type) !== convertValueFromType(question.value, question.type);
                            return;
						case 'greater_than':
							flag = convertValueFromType(question.value, question.type) > convertValueFromType(filter.value, filter.type);
                            return;
						case 'less_than':
							flag = convertValueFromType(question.value, question.type) < convertValueFromType(filter.value, filter.type);
                            return;
						default:
							break;
					}
				}
			});
			return flag;
		}).length === _filters.length);

        const submissions = {
            responses: responses.slice(_offset, _offset + _limit),
            totalResponses: responses.length,
            pageCount: Math.ceil(responses.length / _limit),
        }

        return res.json(submissions);
	}

    return res.json({
        responses: req.submissions.responses.slice(_offset, _offset + _limit),
        totalResponses: req.submissions.responses.length,
        pageCount: Math.ceil(req.submissions.responses.length / _limit),
    });
});

export default router;