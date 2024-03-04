import { Question } from './question';

export type FormModel = {
	id: string;
	name: string;
    questions:
    ((| {
        type: "MultipleChoice" | "MultiSelect" | "Dropdown" | "Checkboxes";
        options: {
            id: string;
            value: string;
            label: string;
        }[]
    }
    | {
        type: Exclude<Question, "MultipleChoice" | "MultiSelect" | "Dropdown" | "Checkboxes">
    }) & {
        id: string;
        name: string;
    })[]
	calculations: {
        id: string;
        name: string;
        type: "number" | "text";
    }[];
	urlParameters: {
        id: string;
        name: string;
    }[];
}