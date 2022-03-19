import {TaskListEnum} from "./TaskListEnum";

export function isIApiTask(obj: any): obj is IApiTask {
    return (
        "name" in obj &&
        "task" in obj &&
        Array.isArray(obj.task) &&
        obj.task.length === 3 &&
        typeof obj.task[0] === "string" &&
        typeof obj.task[1] === "string" &&
        typeof obj.task[2] === "boolean"
    );
}

/**
 * Represents a task and its list name.
 */
export interface IApiTask {
    /**
     * The name of the tasklist.
     */
    name: TaskListEnum;
    /**
     * List of tasks.
     * [frontendId, text, done state]
     */
    task: [string, string, boolean];
}
