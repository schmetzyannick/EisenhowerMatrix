import { TaskSection } from "./TaskSection";
import {IApiTaskList} from "../../../shared/types/IApiTaskList";
import { TaskListEnum } from "../../../shared/types/TaskListEnum";

export class TaskPersistenceUtils{
    public static async saveTaskSections(sections: TaskSection[]): Promise<void>{
        // save all sections to local storage
        sections.forEach((section) => {
            localStorage.setItem(section.sectionTitle, JSON.stringify(section));
        });
        const serverHost = window.location.href;
        await fetch(serverHost + 'api/tasklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskLists: sections.map((section):IApiTaskList  => {
                    return {
                        name: section.sectionTitle as TaskListEnum,
                        tasks: section.taskList,
                    };
                })
            })
        });
    }

    public static async loadAllTaskSections(sections: TaskSection[]): Promise<{listRefs: TaskSection[], counter: number}>{
        // load sections from local storage
        let counter = 1;
        const serverHost = window.location.href;
        const taskListsResp = await fetch(serverHost + 'api/tasklist');
        const taskLists = (await taskListsResp.json()).taskLists as IApiTaskList[];
        taskLists.forEach((section: IApiTaskList) => {
            const frontendSection = sections.find((s) => s.sectionTitle === section.name);
            if(frontendSection !== undefined){
                section.tasks.forEach((task) => {
                    frontendSection.taskList.push(["Task" + counter, task[1], task[2]]);
                    counter++;
                });
            }
        });
        return {listRefs: sections, counter: counter};
    }
}