import { TaskListEnum } from "./TaskListEnum";

/**
 * Represents a tasklist send from to the client.
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