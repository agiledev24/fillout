import {
	Question
} from '../models/question';

export const convertValueFromType = (value: number | string | null, type: Question) => {
	if (!value) {
		return null;
	}
	// ToDo: not sure how to convert and compare values for DateRange, MultipleChoice and Checkboxes etc
	switch (type) {
		case 'NumberInput':
			return typeof value === "string" ? parseFloat(value) : value;
		case 'DatePicker':
			return new Date(value);
		default:
			return value;
	}
}