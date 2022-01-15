import { TaskSection } from "./TaskSection";

export class TaskPersistenceUtils{
    public static saveTaskSections(sections: TaskSection[]): void{
        // save all sections to local storage
        sections.forEach((section) => {
            localStorage.setItem(section.sectionTitle, JSON.stringify(section));
        });
    }

    public static loadAllTaskSections(sections: TaskSection[]): {listRefs: TaskSection[], counter: number}{
        // load sections from local storage
        let counter = 1;
        sections.forEach((section: TaskSection) => {
            const loadedSection = JSON.parse(localStorage.getItem(section.sectionTitle) as string);
            if(loadedSection){
                section.taskList = loadedSection.taskList;
                // set task id to counter
                section.taskList.forEach((task) => {
                    task[0] = 'Task' + counter;
                    counter++;
                });
            }
        });
        return {listRefs: sections, counter: 0};
    }
}