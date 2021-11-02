import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { TaskSection } from 'src/utils/TaskSection';
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
    this.doneSection = new TaskSection('Done');
    this.listRefs.push(this.doneSection);
    this.backLogSection = new TaskSection('Backlog');
    this.listRefs.push(this.backLogSection);
    this.nowSection = new TaskSection('Now');
    this.listRefs.push(this.nowSection);
    this.ownSection = new TaskSection('Own');
    this.listRefs.push(this.ownSection);
    this.delegateSection = new TaskSection('Delegate');
    this.listRefs.push(this.delegateSection);
    this.trashSection = new TaskSection('Trash');
    this.listRefs.push(this.trashSection);
  }
  public addTask(listName: string): void {
    const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
    section?.taskList.push([
      'Task' + this.taskCounter,
      'Task' + this.taskCounter,
    ]);
    this.taskCounter++;
  }

  public deleteTask(params: [string, string]): void {
    const listName = params[0];
    const ident = params[1];
    const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
    section?.taskList.splice(section.taskList.findIndex((task) => task[0] === ident), 1);
  }

  public updateTask(params: [string, string, string]): void {
    const listName = params[0];
    const ident = params[1];
    const desc = params[2]
    const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === listName);
    if(section !== undefined){
      section.taskList[
        section.taskList.findIndex((task) => task[0] === ident)
      ][1] = desc;
    }
  }

  public drop(event: CdkDragDrop<[string, string][]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const itemToMove = JSON.parse(
        JSON.stringify(event.previousContainer.data[event.previousIndex])
      );
      event.previousContainer.data.splice(event.previousIndex, 1);
      const dropContainer = document.getElementById(event.container.id);
      const container = dropContainer?.parentNode?.parentNode as HTMLDivElement;
      const titleContainer = container.firstChild;
      const title = (titleContainer?.firstChild as HTMLParagraphElement)
        .textContent;
      const section = this.listRefs.find((taskSection) => taskSection.sectionTitle === title);
      if(section !== undefined){
        section.taskList.splice(event.currentIndex, 0, itemToMove);
      }
    }
  }
}
