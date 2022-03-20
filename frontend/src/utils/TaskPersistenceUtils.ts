import {TaskSection} from './TaskSection';
import {IApiTaskList} from '../../../shared/types/IApiTaskList';
import {IApiTask} from '../../../shared/types/IApiTask';
import {AppComponent} from 'src/app/app.component';
import { isDevMode } from '@angular/core';

export class TaskPersistenceUtils {
    public static async addTask(task: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task
            }),
        });
    }

    public static async removeTask(task: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task
            }),
        });
    }

    public static async updateTask(newTask: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: newTask,
            }),
        });
    }

    public static async moveTask(oldTaskListName: string, newTask: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldListName: oldTaskListName,
                task: newTask,
            }),
        });
    }

    public static async loadAllTaskSections(
        sections: TaskSection[],
        app: AppComponent,
    ): Promise<{listRefs: TaskSection[]; counter: number}> {
        // load sections from local storage
        let counter = 1;
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        const taskListsResp = await fetch(serverHost + 'api/tasklist');
        const taskLists = (await taskListsResp.json()).taskLists as IApiTaskList[];
        if (taskLists.length === 0) {
            return await TaskPersistenceUtils.createSections(app);
        } else {
            for(const section of taskLists) {
                const frontendSection = sections.find((s) => s.sectionTitle === section.name);
                if (frontendSection !== undefined) {
                    for(let task of section.tasks) {
                        if(task[3] === -1){
                            // migrates default values priorityInList
                            task[3] = counter;
                        }
                        await TaskPersistenceUtils.removeTask({name: section.name, task});
                        task = ['Task' + counter, task[1], task[2], task[3]]
                        frontendSection.taskList.push(task);
                        await TaskPersistenceUtils.addTask({name: section.name, task});
                        counter++;
                    }
                    frontendSection.taskList.sort((a, b) => a[3] - b[3]);
                }
            }
            return {listRefs: sections, counter: counter};
        }
    }

    private static async createSections(app: AppComponent): Promise<{listRefs: TaskSection[]; counter: number}> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        const listNames = [
            app.backLogSection.sectionTitle,
            app.trashSection.sectionTitle,
            app.delegateSection.sectionTitle,
            app.nowSection.sectionTitle,
            app.ownSection.sectionTitle,
            app.doneSection.sectionTitle,
        ];
        for (const name of listNames) {
            await fetch(serverHost + 'api/tasklist', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listName: name,
                }),
            });
        }
        return {
            listRefs: [
                {
                    sectionTitle: app.backLogSection.sectionTitle,
                    taskList: [],
                },
                {
                    sectionTitle: app.doneSection.sectionTitle,
                    taskList: [],
                },
                {
                    sectionTitle: app.nowSection.sectionTitle,
                    taskList: [],
                },
                {
                    sectionTitle: app.ownSection.sectionTitle,
                    taskList: [],
                },
                {
                    sectionTitle: app.delegateSection.sectionTitle,
                    taskList: [],
                },
                {
                    sectionTitle: app.trashSection.sectionTitle,
                    taskList: [],
                },
            ],
            counter: 0,
        };
    }

    private static getBackendUrlPrefix(): string {
        if(isDevMode()){
            return 'http://localhost:4200/';
        }else{
            return window.location.href;
        }
    }
}
