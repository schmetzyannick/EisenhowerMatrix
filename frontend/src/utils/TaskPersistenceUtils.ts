import {TaskSection} from './TaskSection';
import {IApiTaskList} from '../../../shared/types/IApiTaskList';
import {IApiTask} from '../../../shared/types/IApiTask';
import {AppComponent} from 'src/app/app.component';

export class TaskPersistenceUtils {
    /*public static async saveTaskSections(sections: TaskSection[]): Promise<void> {
        // save all sections to local storage
        sections.forEach((section) => {
            localStorage.setItem(section.sectionTitle, JSON.stringify(section));
        });
        const serverHost = window.location.href;
        await fetch(serverHost + 'api/tasklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                taskLists: sections.map((section): IApiTaskList => {
                    return {
                        name: section.sectionTitle as TaskListEnum,
                        tasks: section.taskList,
                    };
                }),
            }),
        });
    }*/

    public static async addTask(task: IApiTask): Promise<void> {
        const serverHost = window.location.href;
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
        const serverHost = window.location.href;
        await fetch(serverHost + 'api/task', {
            method: 'DELETEA',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task
            }),
        });
    }

    public static async updateTask(newTask: IApiTask): Promise<void> {
        const serverHost = window.location.href;
        await fetch(serverHost + '/api/task', {
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
        const serverHost = window.location.href;
        await fetch(serverHost + '/api/task', {
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
        const serverHost = window.location.href;
        const taskListsResp = await fetch(serverHost + 'api/tasklist');
        const taskLists = (await taskListsResp.json()).taskLists as IApiTaskList[];
        if (taskLists.length === 0) {
            return await TaskPersistenceUtils.createSections(app);
        } else {
            taskLists.forEach((section: IApiTaskList) => {
                const frontendSection = sections.find((s) => s.sectionTitle === section.name);
                if (frontendSection !== undefined) {
                    section.tasks.forEach((task) => {
                        frontendSection.taskList.push(['Task' + counter, task[1], task[2]]);
                        counter++;
                    });
                }
            });
            return {listRefs: sections, counter: counter};
        }
    }

    private static async createSections(app: AppComponent): Promise<{listRefs: TaskSection[]; counter: number}> {
        const serverHost = window.location.href;
        const listNames = [
            app.backLogSection.sectionTitle,
            app.trashSection.sectionTitle,
            app.delegateSection.sectionTitle,
            app.nowSection.sectionTitle,
            app.ownSection.sectionTitle,
            app.doneSection.sectionTitle,
        ];
        for (const listName of listNames) {
            await fetch(serverHost + 'api/task', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    listName: listName,
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

}
