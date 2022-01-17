import { Task } from "../database/Task";
import { TaskList } from "../database/TaskList";
import { User } from "../database/User";
import { IApiTaskList } from "../../../shared/types/IApiTaskList";
import { Logger } from "../utils/Logger";
import express from "express";

export class TaskListRouter{

    public static registerRoutes(app: express.Application): void{
        app.get(TaskListRouter.path, TaskListRouter.getTaskLists);
        app.post(TaskListRouter.path, TaskListRouter.overwriteTasks);
    }

    private static path = "/api/tasklist";

    private static async getTaskLists(req: express.Request, res: express.Response): Promise<void>{
        const result: IApiTaskList[] =  [];
        // TODO: multi user comatibility
        const user = await User.findOne({
            where: {
                name: "admin",
            }
        });
        if( user !== null){
            Logger.getLogger().info("Load tasks for user: " + user.name);
            const lists = await TaskList.findAll({
                where: {
                    userId: user.id,
                }
            });
            for(const list of lists){
                const tasks = await Task.findAll({
                    where: {
                        taskListId: list.id,
                    }
                });
                if(tasks !== null){
                    result.push({
                        name: list.name,
                        tasks: tasks.map(task => [task.name, task.description, task.status]),
                    });
                }else{
                    result.push({name: list.name, tasks: []});
                }
            }
        }
        res.status(200).send({
            taskLists: result,
        });
    }

    private static async overwriteTasks(req: express.Request, res: express.Response): Promise<void>{
        const taskLists = req.body.taskLists as IApiTaskList[];
        // TODO: multi user comatibility
        const user = await User.findOne({
            where: {
                name: "admin",
            }
        });
        if( user !== null){
            Logger.getLogger().info("Save tasks for user: " + user.name);
            const lists = await TaskList.findAll({
                where: {
                    userId: user.id,
                }
            });
            await TaskListRouter.deleteTaskLists(lists);
            await TaskListRouter.createTaskLists(user, taskLists);
        }
    }

    private static async deleteTaskLists(taskLists: TaskList[]): Promise<void>{
        for(const list of taskLists){
            const tasks = await Task.findAll({
                where: {
                    taskListId: list.id,
                }
            });
            for(const task of tasks){
                await task.destroy();
            }
            await list.destroy();
        }
    }

    private static async createTaskLists(user: User, taskLists: IApiTaskList[]): Promise<void>{
        for(const list of taskLists){
            const newList = await TaskList.create({
                name: list.name,
                userId: user.id,
            });
            for(const task of list.tasks){
                await Task.create({
                    name: task[0],
                    description: task[1],
                    status: task[2],
                    taskListId: newList.id,
                });
            }
        }
    }
}
