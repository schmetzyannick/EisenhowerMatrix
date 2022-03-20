import {TaskSection} from './TaskSection';
import {IApiTaskList} from '../../../shared/types/IApiTaskList';
import {IApiTask} from '../../../shared/types/IApiTask';
import {AppComponent} from 'src/app/app.component';
import {isDevMode} from '@angular/core';
import {TaskListEnum} from '../../../shared/types/TaskListEnum';

/**
 * TaskPersistenceUtils.
 */
export class TaskPersistenceUtils {
    /**
     * Api call to add a task.
     * @param task Task to add.
     */
    public static async addTask(task: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task,
            }),
        });
    }

    /**
     * Api call to delete a task.
     * @param task Task to delete.
     */
    public static async removeTask(task: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task,
            }),
        });
    }

    /**
     *  Api call to update a task.
     * @param task Task to update.
     */
    public static async updateTask(task: IApiTask): Promise<void> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
        await fetch(serverHost + 'api/task', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task: task,
            }),
        });
    }

    /**
     * Relate a task to another tasklist table.
     * @param oldTaskListName Name of the previous list.
     * @param newTask The task, containing the new list name and new position.
     */
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

    /**
     * Load all tasks from the backend.
     * @param sections Sections, to lkoad the tasks for.
     * @param app App, to load the tasks into.
     */
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
            const listNames = [
                app.backLogSection.sectionTitle,
                app.trashSection.sectionTitle,
                app.delegateSection.sectionTitle,
                app.nowSection.sectionTitle,
                app.ownSection.sectionTitle,
                app.doneSection.sectionTitle,
            ];
            return await TaskPersistenceUtils.createSections(listNames);
        } else {
            for (const section of taskLists) {
                const frontendSection = sections.find((s) => s.sectionTitle === section.name);
                if (frontendSection !== undefined) {
                    for (let task of section.tasks) {
                        if (task[3] === -1) {
                            // migrates default values priorityInList
                            task[3] = counter;
                        }
                        await TaskPersistenceUtils.removeTask({name: section.name, task});
                        task = ['Task' + counter, task[1], task[2], task[3]];
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

    private static async createSections(
        listNames: TaskListEnum[],
    ): Promise<{listRefs: TaskSection[]; counter: number}> {
        const serverHost = TaskPersistenceUtils.getBackendUrlPrefix();
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
        const listRefs: TaskSection[] = [];
        listNames.forEach((list) => {
            listRefs.push({
                sectionTitle: list,
                taskList: [],
            });
        });
        return {
            listRefs,
            counter: 0,
        };
    }

    private static getBackendUrlPrefix(): string {
        if (isDevMode()) {
            return 'http://localhost:4200/';
        } else {
            return window.location.href;
        }
    }
}
