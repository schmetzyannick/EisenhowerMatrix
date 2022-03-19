import express from "express";
import {User} from "../database/User";
import {IApiTask, isIApiTask} from "../../../shared/types/IApiTask";
import {TaskList} from "../database/TaskList";
import {Task} from "../database/Task";

export class TaskRouter {
    public static registerRoutes(app: express.Application): void {
        app.put(TaskRouter.path, TaskRouter.createTask);
        app.post(TaskRouter.path, TaskRouter.moveAndUpdateTask);
        app.patch(TaskRouter.path, TaskRouter.updateTask);
        app.delete(TaskRouter.path, TaskRouter.deleteTask);
    }

    private static path = "/api/task";

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
                    res.status(404).send(`Could not find tasklist ${req.body.listName}`);
                    throw new Error(`Could not find tasklist ${req.body.listName}`);
                }
                await Task.create({
                    name: task.task[0],
                    description: task.task[1],
                    status: task.task[2],
                    taskListId: taskList.id,
                });
            }
        } else {
            res.status(404).send({error: "Please provide a task!"});
            throw new Error("Please provide a task!");
        }
        res.status(200).send();
    }

    private static async updateTask(req: express.Request, res: express.Response): Promise<void> {
        if (req.body.tasklist !== undefined && isIApiTask(req.body.tasklist)) {
            const task = req.body.tasklist as IApiTask;
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
                    throw new Error(`Could not find tasklist ${req.body.listName}`);
                }
                const updated = await Task.update(
                    {
                        description: task.task[1],
                        status: task.task[2],
                    },
                    {
                        where: {
                            taskListId: taskList.id,
                            name: task.task[0],
                        },
                    },
                );
                if (updated[0] === 0) {
                    throw new Error(`Could not update task ${req.body.task.tasks[0]}`);
                }
            }
        } else {
            throw new Error("Please provide a list name!");
        }
    }

    private static async deleteTask(req: express.Request, res: express.Response): Promise<void> {
        if (req.body.task !== undefined && isIApiTask(req.body.task)) {
            const task = req.body.tasklist as IApiTask;
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
                    throw new Error(`Could not find tasklist ${req.body.listName}`);
                }
                const deleted = await Task.destroy({
                    where: {
                        taskListId: taskList.id,
                        name: task.task[0],
                    },
                });
                if (deleted === 0) {
                    throw new Error(`Could not delete task ${req.body.task.tasks[0]}`);
                }
            }
        } else {
            throw new Error("Please provide a list name!");
        }
    }

    private static async moveAndUpdateTask(req: express.Request, res: express.Response): Promise<void> {
        if (
            req.body.task !== undefined &&
            isIApiTask(req.body.task) &&
            req.body.oldListName !== undefined &&
            typeof req.body.oldListName === "string"
        ) {
            const task = req.body.tasklist as IApiTask;
            // TODO: multi user comatibility
            const user = await User.findOne({
                where: {
                    name: "admin",
                },
            });
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
                    throw new Error(`Could not one of the lists  ${req.body.oldListName} or ${task.name}`);
                }
                const dbTask = await Task.findOne({
                    where: {
                        taskListId: oldList.id,
                        name: task.task[0],
                    },
                });
                if (dbTask === null) {
                    throw new Error(`Could not find original task ${req.body.task.tasks[0]}`);
                }
                const updated = await Task.update(
                    {
                        description: task.task[1],
                        status: task.task[2],
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
                    throw new Error(`Could not update task ${req.body.task.tasks[0]}`);
                }
            }
        } else {
            throw new Error("Please provide a list name!");
        }
    }
}
