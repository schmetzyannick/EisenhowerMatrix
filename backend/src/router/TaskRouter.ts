import express from "express";
import {User} from "../database/User";
import {IApiTask, isIApiTask} from "../../../shared/types/IApiTask";
import {TaskList} from "../database/TaskList";
import {Task} from "../database/Task";
import {ResponseUtils} from "../utils/ResonseUtils";

/**
 * Router for the tasks.
 */
export class TaskRouter {
    /**
     * Must be called to register the routes.
     * @param app The application on wich the routes will be rigistred.
     */
    public static registerRoutes(app: express.Application): void {
        app.put(TaskRouter.path, TaskRouter.createTask);
        app.post(TaskRouter.path, TaskRouter.moveAndUpdateTask);
        app.patch(TaskRouter.path, TaskRouter.updateTask);
        app.delete(TaskRouter.path, TaskRouter.deleteTask);
    }

    private static path = "/api/task";

    private static async getUser(): Promise<User | null> {
        return await User.findOne({
            where: {
                name: "admin",
            },
        });
    }

    private static async createTask(req: express.Request, res: express.Response): Promise<void> {
        if (req.body.task !== undefined && isIApiTask(req.body.task)) {
            const task = req.body.task as IApiTask;
            // TODO: multi user comatibility
            const user = await User.findOne({
                where: {
                    name: "admin",
                },
            });
            if (user !== null) {
                const taskList = await TaskList.findOne({
                    where: {
                        name: task.name,
                        userId: user.id,
                    },
                });
                if (taskList === null) {
                    return;
                }
                await Task.create({
                    name: task.task[0],
                    description: task.task[1],
                    status: task.task[2],
                    priorityInList: task.task[3],
                    taskListId: taskList.id,
                });
            }
        } else {
            ResponseUtils.sendResponseUserError(res, "Please provide a proper task!");
        }
        ResponseUtils.sendResponseOk(res, {});
    }

    private static async updateTask(req: express.Request, res: express.Response): Promise<void> {
        if (req.body.task !== undefined && isIApiTask(req.body.task)) {
            const task = req.body.task as IApiTask;
            const user = await TaskRouter.getUser();
            if (user !== null) {
                const taskList = await TaskList.findOne({
                    where: {
                        name: task.name,
                        userId: user.id,
                    },
                });
                if (taskList === null) {
                    ResponseUtils.sendResponseUserError(res, `Could not find tasklist ${task.name}`);
                    return;
                }
                const updated = await Task.update(
                    {
                        description: task.task[1],
                        status: task.task[2],
                        priorityInList: task.task[3],
                    },
                    {
                        where: {
                            taskListId: taskList.id,
                            name: task.task[0],
                        },
                    },
                );
                if (updated[0] === 0) {
                    ResponseUtils.sendResponseUserError(res, `Could not update task ${task.task[0]}`);
                }
            }
        } else {
            ResponseUtils.sendResponseUserError(res, "Please provide a proper task!");
        }
        ResponseUtils.sendResponseOk(res, {});
    }

    private static async deleteTask(req: express.Request, res: express.Response): Promise<void> {
        if (req.body.task !== undefined && isIApiTask(req.body.task)) {
            const task = req.body.task as IApiTask;
            // TODO: multi user comatibility
            const user = await TaskRouter.getUser();
            if (user !== null) {
                const taskList = await TaskList.findOne({
                    where: {
                        name: task.name,
                        userId: user.id,
                    },
                });
                if (taskList === null) {
                    ResponseUtils.sendResponseUserError(res, `Could not find tasklist ${req.body.listName}`);
                    return;
                }
                const deleted = await Task.destroy({
                    where: {
                        taskListId: taskList.id,
                        name: task.task[0],
                    },
                });
                if (deleted === 0) {
                    ResponseUtils.sendResponseUserError(
                        res,
                        `Could not delete task ${task.task[0]} from tasklist ${task.name}`,
                    );
                }
            }
        } else {
            ResponseUtils.sendResponseUserError(res, "Please provide a proper task!");
        }
        ResponseUtils.sendResponseOk(res, {});
    }

    // TODO: Refactore me
    // eslint-disable-next-line max-lines-per-function
    private static async moveAndUpdateTask(req: express.Request, res: express.Response): Promise<void> {
        if (
            req.body.task !== undefined &&
            isIApiTask(req.body.task) &&
            req.body.oldListName !== undefined &&
            typeof req.body.oldListName === "string"
        ) {
            const task = req.body.task as IApiTask;
            // TODO: multi user comatibility
            const user = await TaskRouter.getUser();
            if (user !== null) {
                const oldList = await TaskList.findOne({
                    where: {
                        name: req.body.oldListName,
                        userId: user.id,
                    },
                });
                const newList = await TaskList.findOne({
                    where: {
                        name: task.name,
                        userId: user.id,
                    },
                });
                if (oldList === null || newList === null) {
                    ResponseUtils.sendResponseUserError(
                        res,
                        `Could not one of the lists  ${req.body.oldListName} or ${task.name}`,
                    );
                    return;
                }
                const dbTask = await Task.findOne({
                    where: {
                        taskListId: oldList.id,
                        name: task.task[0],
                    },
                });
                if (dbTask === null) {
                    ResponseUtils.sendResponseUserError(res, `Could not find original task ${task.task[0]}`);
                    return;
                }
                const updated = await Task.update(
                    {
                        description: task.task[1],
                        status: task.task[2],
                        priorityInList: task.task[3],
                        taskListId: newList.id,
                    },
                    {
                        where: {
                            taskListId: oldList.id,
                            name: task.task[0],
                        },
                    },
                );
                if (updated[0] === 0) {
                    ResponseUtils.sendResponseUserError(res, `Could not update task ${task.task[0]}`);
                }
            }
        } else {
            ResponseUtils.sendResponseUserError(res, "Please provide a proper task!");
        }
        ResponseUtils.sendResponseOk(res, {});
    }
}
