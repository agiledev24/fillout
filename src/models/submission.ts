import { Question } from './question';

export type Submission = {
    responses: {
        submissionId: string;
        submissionTime: string;
        lastUpdatedAt: string;
        questions: ((| {
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
            value?: number | string;
        })[];
        calculations: {
            id: string;
            name: string;
            type: "number" | "text";
            value: number | string;
        }[];
        urlParameters: {
            id: string;
            name: string;
            value: string;
        }[];
        quiz: {
            [key: string]: string
        };
        documents: {
            [key: string]: string
        }[];
    }[],
    totalResponses: number;
    pageCount: number;
}