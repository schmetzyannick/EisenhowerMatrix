import {TaskListEnum} from "./TaskListEnum";

/**
 * Checks if it is a valid task.
 */
export function isIApiTask(obj: unknown): obj is IApiTask {
    return (
        typeof obj === "object" &&
        obj !== null &&
        "name" in obj &&
        "task" in obj &&
        Array.isArray((obj as {task: unknown[]}).task) &&
        (obj as {task: unknown[]}).task.length === 4 &&
        typeof (obj as {task: unknown[]}).task[0] === "string" &&
        typeof (obj as {task: unknown[]}).task[1] === "string" &&
        typeof (obj as {task: unknown[]}).task[2] === "boolean" &&
        typeof (obj as {task: unknown[]}).task[3] === "number"
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
     * [frontendId, text, done state, priorityInList]
     */
    task: [string, string, boolean, number];
}
