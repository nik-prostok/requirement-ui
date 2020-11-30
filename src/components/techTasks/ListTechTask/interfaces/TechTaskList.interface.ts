export interface ListTechTaskResponse {
    technicalTasks: TechTask[];
}

export interface TechTask {
    name: string;
    id: number;
}
