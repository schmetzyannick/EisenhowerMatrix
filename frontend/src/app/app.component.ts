import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public titleLeftAddSection = 'Done';
  public titleRigthAddSection = 'Backlog';
  public titleNowCard = 'Now';
  public titleOwnCard = 'Own';
  public titleDelegateCard = 'Delegate';
  public titleTrashCard = 'Trash';

  public nowSectionTaskList: Array<[string, string]> = [];
  public ownSectionTaskList: Array<[string, string]> = [];
  public delegateSectionTaskList: Array<[string, string]> = [];
  public trashSectionTaskList: Array<[string, string]> = [];
  public doneSectionTaskList: Array<[string, string]> = [];
  public backLogSectionTaskList: Array<[string, string]> = [];

  public nowTaskCount: number = 0;
  public ownTaskCount: number = 0;
  public delegateTaskCount: number = 0;
  public trashTaskCount: number = 0;
  public doneTaskCount: number = 0;
  public backLogTaskCount: number = 0;

  public tasks: string[] = [];

  public addTask(listIdent: string): void {
    if (listIdent.startsWith('now')) {
      this.nowSectionTaskList.push([
        'Task' + this.nowTaskCount,
        'Task' + (this.nowSectionTaskList.length + 1),
      ]);
      this.nowTaskCount++;
    } else if (listIdent.startsWith('own')) {
      this.ownSectionTaskList.push([
        'Task' + this.ownSectionTaskList,
        'Task' + (this.ownSectionTaskList.length + 1),
      ]);
      this.ownTaskCount++;
    } else if (listIdent.startsWith('delegate')) {
      this.delegateSectionTaskList.push([
        'Task' + this.delegateTaskCount,
        'Task' + (this.delegateSectionTaskList.length + 1),
      ]);
      this.delegateTaskCount++;
    } else if (listIdent.startsWith('trash')) {
      this.trashSectionTaskList.push([
        'Task' + this.trashTaskCount,
        'Task' + (this.trashSectionTaskList.length + 1),
      ]);
      this.trashTaskCount++;
    } else if (listIdent.startsWith('backLog')) {
      this.backLogSectionTaskList.push([
        'Task' + this.backLogTaskCount,
        'Task' + (this.backLogSectionTaskList.length + 1),
      ]);
      this.backLogTaskCount++;
    }
  }

  public deleteTask(ident: string): void {
    const taskIndex = ident.indexOf('Task');
    const listIdent = ident.substring(0, taskIndex);
    const taskIdent = ident.substring(taskIndex);
    if (listIdent === this.titleLeftAddSection) {
      this.doneSectionTaskList.splice(
        this.doneSectionTaskList[0].indexOf(taskIdent),
        1
      );
    }
    if (listIdent === this.titleRigthAddSection) {
      this.backLogSectionTaskList.splice(
        this.backLogSectionTaskList[0].indexOf(taskIdent),
        1
      );
    }
    if (listIdent === this.titleNowCard) {
      this.nowSectionTaskList.splice(
        this.nowSectionTaskList[0].indexOf(taskIdent),
        1
      );
      console.log(taskIdent);
      console.log(this.nowSectionTaskList);
    }
    if (listIdent === this.titleDelegateCard) {
      this.delegateSectionTaskList.splice(
        this.delegateSectionTaskList[0].indexOf(taskIdent),
        1
      );
    }
    if (listIdent === this.titleOwnCard) {
      this.ownSectionTaskList.splice(
        this.ownSectionTaskList[0].indexOf(taskIdent),
        1
      );
    }
    if (listIdent === this.titleTrashCard) {
      this.trashSectionTaskList.splice(
        this.trashSectionTaskList[0].indexOf(taskIdent),
        1
      );
    }
  }

  public updateTask(params: [string, string]): void {
    const ident = params[0];
    const taskIndex = ident.indexOf('Task');
    const listIdent = ident.substring(0, taskIndex);
    const taskIdent = ident.substring(taskIndex);
    if (listIdent === this.titleLeftAddSection) {
      this.doneSectionTaskList[
        this.doneSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
    }
    if (listIdent === this.titleRigthAddSection) {
      this.backLogSectionTaskList[
        this.backLogSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
    }
    if (listIdent === this.titleNowCard) {
      this.nowSectionTaskList[
        this.nowSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
    }
    if (listIdent === this.titleDelegateCard) {
      this.delegateSectionTaskList[
        this.delegateSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
    }
    if (listIdent === this.titleOwnCard) {
      this.ownSectionTaskList[
        this.ownSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
    }
    if (listIdent === this.titleTrashCard) {
      this.trashSectionTaskList[
        this.trashSectionTaskList[0].indexOf(taskIdent)
      ][1] = params[1];
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
      let listAndCounter: [Array<[string, string]>, number] = [[], 0];
      switch (title) {
        case this.titleLeftAddSection: {
          listAndCounter = [this.doneSectionTaskList, this.doneTaskCount];
          break;
        }
        case this.titleRigthAddSection: {
          listAndCounter = [this.backLogSectionTaskList, this.backLogTaskCount];
          break;
        }
        case this.titleNowCard: {
          listAndCounter = [this.nowSectionTaskList, this.nowTaskCount];
          break;
        }
        case this.titleOwnCard: {
          listAndCounter = [this.ownSectionTaskList, this.ownTaskCount];
          break;
        }
        case this.titleDelegateCard: {
          listAndCounter = [this.delegateSectionTaskList, this.delegateTaskCount];
          break;
        }
        case this.titleTrashCard: {
          listAndCounter = [this.trashSectionTaskList, this.trashTaskCount];
          break;
        }
        default: {
          throw Error('Unkown title!');
        }
      }
      const newIdent = "Task"+listAndCounter[1];
      listAndCounter[0].splice(event.currentIndex, 0, [newIdent, itemToMove[1]]);
    }
  }
}
