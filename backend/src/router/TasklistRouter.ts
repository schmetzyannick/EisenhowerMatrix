import { Task } from "../database/Task";
import { TaskList } from "../database/TaskList";
import { User } from "../database/User";
import { Logger } from "../utils/Logger";
import express from "express";
import { IApiTaskList } from "../../../shared/types/IApiTaskList";

export class TaskListRouter{

    public static registerRoutes(app: express.Application): void{
        app.get(TaskListRouter.path, TaskListRouter.getTaskLists);
        app.put(TaskListRouter.path, TaskListRouter.createTaskList);
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

    private static async createTaskList(req: express.Request, res: express.Response): Promise<void>{
        if(req.body.listName === undefined || typeof req.body.listName !== "string"){
            throw new Error("Please provide a list name!");
        }
        // TODO: multi user comatibility
        const user = await User.findOne({
            where: {
                name: "admin",
            }
        });
        if(user !== null){
            const newList = await TaskList.create({
                name: req.body.listName,
                userId: user.id,
            });
            if(newList ===null){
                throw new Error(`Could not create tasklist ${req.body.listName}`);
            }
        }
    }
}
