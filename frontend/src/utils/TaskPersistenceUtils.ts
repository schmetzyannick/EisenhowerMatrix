import { TaskSection } from "./TaskSection";

export class TaskPersistenceUtils{
    public static saveTaskSections(sections: TaskSection[]): void{
        // save all sections to local storage
        sections.forEach((section) => {
            localStorage.setItem(section.sectionTitle, JSON.stringify(section));
        });
    }

    public static loadAllTaskSections(sections: TaskSection[]): TaskSection[]{
        // load sections from local storage
        sections.forEach((section: TaskSection) => {
            const loadedSection = JSON.parse(localStorage.getItem(section.sectionTitle) as string);
            if(loadedSection){
                section.taskList = loadedSection.taskList;
            }
        });
        return sections
    }
}