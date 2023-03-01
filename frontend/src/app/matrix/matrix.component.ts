import {Component} from '@angular/core';
import {Logger} from "../../utils/Logger"
import { TaskPersistenceUtils } from 'src/utils/TaskPersistenceUtils';
import { TaskListEnum } from '../../../../shared/types/TaskListEnum';
import { TaskSection } from 'src/utils/TaskSection';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-matrix',
    templateUrl: './matrix.component.html',
    styleUrls: ['./matrix.component.scss'],
})
export class MatrixComponent {
    /**
     * The done task section.
     */
    public doneSection: TaskSection;
    /**
     * The backlog task section.
     */
    public backLogSection: TaskSection;
    /**
     * The new task section.
     */
    public nowSection: TaskSection;
    /**
     * The own task section.
     */
    public ownSection: TaskSection;
    /**
     * The delegate task section.
     */
    public delegateSection: TaskSection;
    /**
     * The trash task section.
     */
    public trashSection: TaskSection;

    /**
     * The task counter.
     */
    public taskCounter = 0;
    /**
     * Refs to all sections.
     */
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

    /**
     * Adds a task.
     * @param listName Section to add the task to.
     */
    public addTask(listName: string): void {
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            const taskToAdd: [string, string, boolean, number] = [
                'Task' + this.taskCounter,
                'Task' + this.taskCounter,
                false,
                section.taskList.length,
            ];
            section?.taskList.push(taskToAdd);
            this.taskCounter++;
            TaskPersistenceUtils.addTask({
                name: section.sectionTitle as TaskListEnum,
                task: taskToAdd,
            }).catch((err) => {
                Logger.error(err);
            });
        }
    }

    /**
     * Deletes a task.
     * @param params Section name and task name, of the task that should be deleted.
     */
    public deleteTask(params: [string, string]): void {
        const listName = params[0];
        const ident = params[1];
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            section?.taskList.splice(
                section.taskList.findIndex((task) => task[0] === ident),
                1,
            );
            TaskPersistenceUtils.removeTask({
                name: section.sectionTitle,
                task: [ident, '', false, -1],
            }).catch((err) => {
                Logger.error(err);
            });
        }
    }

    /**
     * Updates the task.
     * @param params Task members for the update.
     */
    public updateTask(params: [string, string, string, number]): void {
        const listName = params[0];
        const ident = params[1];
        const desc = params[2];
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
        if (section !== undefined) {
            const taskIndex = section.taskList.findIndex((task) => task[0] === ident);
            section.taskList[taskIndex][1] = desc;
            TaskPersistenceUtils.updateTask({
                name: section.sectionTitle,
                task: [ident, desc, section.taskList[taskIndex][2], params[3]],
            }).catch((err) => {
                Logger.error(err);
            });
        }
    }

    /**
     * Handels the drop event of a task in a section.
     * @param event The angular drop event.
     */
    public drop(event: CdkDragDrop<[string, string, boolean, number][]>): void {
        const dropContainer = document.getElementById(event.container.id);
        const container = dropContainer?.parentNode?.parentNode as HTMLDivElement;
        const titleContainer = container.firstChild;
        const title = (titleContainer?.firstChild as HTMLParagraphElement).textContent || '';
        const itemToMove = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
        const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === title);
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            this.updatePositions(event, title, title).catch((err) => {
                Logger.error(err);
            });
            return;
        } else if (section !== undefined) {
            event.previousContainer.data.splice(event.previousIndex, 1);
            section.taskList.splice(event.currentIndex, 0, itemToMove);
            const dragContainer = document.getElementById(event.previousContainer.id);
            const wrapperDragContainer = dragContainer?.parentNode?.parentNode as HTMLDivElement;
            const titleContainerDrag = wrapperDragContainer.firstChild;
            const titleDragContainer = (titleContainerDrag?.firstChild as HTMLParagraphElement).textContent || '';
            TaskPersistenceUtils.moveTask(titleDragContainer, {
                name: section.sectionTitle,
                task: itemToMove,
            })
                .then(() => {
                    this.updatePositions(event, title, titleDragContainer).catch((err) => {
                        Logger.error(err);
                    });
                })
                .catch((err) => {
                    Logger.error(err);
                });
        }
    }

    /**
     * Task checkbox click handler.
     * @param params The list name, task name and checked state.
     */
    public taskCheckBoxClicked(params: [string, string, boolean]): void {
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
            TaskPersistenceUtils.moveTask(this.doneSection.sectionTitle, {
                name: this.backLogSection.sectionTitle,
                task: removedItems[0],
            }).catch((err) => {
                Logger.error(err);
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
                TaskPersistenceUtils.moveTask(section.sectionTitle, {
                    name: this.doneSection.sectionTitle,
                    task: itemsToMove[0],
                }).catch((err) => {
                    Logger.error(err);
                });
            }
        }
    }

    private loadAllTasks(): void {
        TaskPersistenceUtils.loadAllTaskSections(this.listRefs, this)
            .then((res) => {
                this.listRefs = res.listRefs;
                this.taskCounter = res.counter;
            })
            .catch((err) => {
                Logger.error(err);
            });
    }

    private async updatePositions(
        event: CdkDragDrop<[string, string, boolean, number][]>,
        containerName: string,
        oldContainerName: string,
    ): Promise<void> {
        event.container.data.forEach((task, index) => {
            task[3] = index;
        });
        for (const task of event.container.data) {
            TaskPersistenceUtils.updateTask({
                name: containerName as TaskListEnum,
                task: task,
            });
        }
        if (oldContainerName !== containerName) {
            event.previousContainer.data.forEach((task, index) => {
                task[3] = index;
            });
            for (const task of event.previousContainer.data) {
                TaskPersistenceUtils.updateTask({
                    name: oldContainerName as TaskListEnum,
                    task: task,
                });
            }
        }
    }
}
