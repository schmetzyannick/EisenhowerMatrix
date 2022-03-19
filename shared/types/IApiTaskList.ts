import { TaskListEnum } from "./TaskListEnum";
/**
 * Represents a tasklist.
 */
export interface IApiTaskList {
    /**
     * The name of the tasklist.
     */
    name: TaskListEnum;
    /**
     * List of tasks.
     * [frontendId, text, done state]
     */
    tasks: Array<[string, string, boolean]>;
}