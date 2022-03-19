import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TaskSection} from 'src/utils/TaskSection';
import {TaskPersistenceUtils} from 'src/utils/TaskPersistenceUtils';
import {TaskListEnum} from '../../../shared/types/TaskListEnum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public doneSection: TaskSection;
    public backLogSection: TaskSection;
    public nowSection: TaskSection;
    public ownSection: TaskSection;
    public delegateSection: TaskSection;
    public trashSection: TaskSection;

    public taskCounter = 0;
    public listRefs: TaskSection[];

    constructor() {
        this.listRefs = [];
        this.doneSection = new TaskSection(TaskListEnum.Done);
        this.listRefs.push(this.doneSection);
        this.backLogSection = new TaskSection(TaskListEnum.Backlog);
        this.listRefs.push(this.backLogSection);
        this.nowSection = new TaskSection(TaskListEnum.Now);
        this.listRefs.push(this.nowSection);
        this.ownSection = new TaskSection(TaskListEnum.Own);
        this.listRefs.push(this.ownSection);
        this.delegateSection = new TaskSection(TaskListEnum.Delegate);
        this.listRefs.push(this.delegateSection);
        this.trashSection = new TaskSection(TaskListEnum.Trash);
        this.listRefs.push(this.trashSection);
        this.loadAllTasks();
    }

    private loadAllTasks(): void {
        TaskPersistenceUtils.loadAllTaskSections(this.listRefs, this)
            .then((res) => {
                this.listRefs = res.listRefs;
                this.taskCounter = res.counter;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    public async addTask(listName: string): Promise<void> {
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            const taskToAdd: [string, string, boolean] = ['Task' + this.taskCounter, 'Task' + this.taskCounter, false];
            section?.taskList.push(taskToAdd);
            this.taskCounter++;
            await TaskPersistenceUtils.addTask({
                name: section.sectionTitle as TaskListEnum,
                task: taskToAdd,
            });
        }
    }

    public async deleteTask(params: [string, string]): Promise<void> {
        const listName = params[0];
        const ident = params[1];
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            section?.taskList.splice(
                section.taskList.findIndex((task) => task[0] === ident),
                1,
            );
            await TaskPersistenceUtils.removeTask({
                name: section.sectionTitle,
                task: [ident, '', false],
            });
        }
    }

    public async updateTask(params: [string, string, string]): Promise<void> {
        const listName = params[0];
        const ident = params[1];
        const desc = params[2];
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            const taskIndex = section.taskList.findIndex((task) => task[0] === ident);
            section.taskList[taskIndex][1] = desc;
            await TaskPersistenceUtils.updateTask({
                name: section.sectionTitle,
                task: [ident, desc, section.taskList[taskIndex][2]],
            });
        }
    }

    public async drop(event: CdkDragDrop<[string, string, boolean][]>): Promise<void> {
        const dropContainer = document.getElementById(event.container.id);
        const container = dropContainer?.parentNode?.parentNode as HTMLDivElement;
        const titleContainer = container.firstChild;
        const title = (titleContainer?.firstChild as HTMLParagraphElement).textContent;
        const itemToMove = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === title);
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            event.previousContainer.data.splice(event.previousIndex, 1);
            if (section !== undefined) {
                section.taskList.splice(event.currentIndex, 0, itemToMove);
            }
        }
        if (section !== undefined) {
            const dragContainer = document.getElementById(event.previousContainer.id);
            const wrapperDragContainer = dragContainer?.parentNode?.parentNode as HTMLDivElement;
            const titleContainerDrag = wrapperDragContainer.firstChild;
            const titleDragContainer = (titleContainerDrag?.firstChild as HTMLParagraphElement).textContent || '';
            await TaskPersistenceUtils.moveTask(titleDragContainer, {
                name: section.sectionTitle,
                task: itemToMove,
            });
        }
    }

    public async taskCheckBoxClicked(params: [string, string, boolean]): Promise<void> {
        const listName = params[0];
        const ident = params[1];
        const checked = params[2];
        if (!checked && listName === this.doneSection.sectionTitle) {
            const removedItems = this.doneSection.taskList.splice(
                this.doneSection.taskList.findIndex((task) => task[0] === ident),
                1,
            );
            removedItems[0][2] = checked;
            this.backLogSection.taskList.splice(0, 0, removedItems[0]);
            await TaskPersistenceUtils.moveTask(this.doneSection.sectionTitle, {
                name: this.backLogSection.sectionTitle,
                task: removedItems[0],
            });
        } else if (checked && listName !== this.doneSection.sectionTitle) {
            const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
            if (section !== undefined) {
                const itemsToMove = section.taskList.splice(
                    section.taskList.findIndex((task) => task[0] === ident),
                    1,
                );
                itemsToMove[0][2] = checked;
                this.doneSection.taskList.splice(0, 0, itemsToMove[0]);
                await TaskPersistenceUtils.moveTask(section.sectionTitle, {
                  name: this.doneSection.sectionTitle,
                  task: itemsToMove[0],
              });
            }
        }
    }
}
