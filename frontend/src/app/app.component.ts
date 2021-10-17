import { Component } from '@angular/core';

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

  public nowSectionTaskList: string[] = [];
  public ownSectionTaskList: string[] = [];
  public delegateSectionTaskList: string[] = [];
  public trashSectionTaskList: string[] = [];
  public doneSectionTaskList: string[] = [];
  public backLogSectionTaskList: string[] = [];

  public tasks: string[] = [];
  public addTask(listIdent: string): void {
    if (listIdent.startsWith('now')) {
      this.nowSectionTaskList.push(
        'Task' + (this.nowSectionTaskList.length + 1)
      );
    } else if (listIdent.startsWith('own')) {
      this.ownSectionTaskList.push(
        'Task' + (this.ownSectionTaskList.length + 1)
      );
    } else if (listIdent.startsWith('delegate')) {
      this.delegateSectionTaskList.push(
        'Task' + (this.delegateSectionTaskList.length + 1)
      );
    } else if (listIdent.startsWith('trash')) {
      this.trashSectionTaskList.push(
        'Task' + (this.trashSectionTaskList.length + 1)
      );
    } else if (listIdent.startsWith('backLog')) {
      this.backLogSectionTaskList.push(
        'Task' + (this.backLogSectionTaskList.length + 1)
      );
    }
  }

  public deleteTask(ident: string): void {
    const taskIndex = ident.indexOf('Task');
    const listIdent = ident.substring(0, taskIndex);
    const taskIdent = ident.substring(0, taskIndex);
    if(listIdent === this.titleLeftAddSection){
      this.doneSectionTaskList.splice(this.doneSectionTaskList.indexOf(taskIdent));
    }
    if(listIdent === this.titleRigthAddSection){
      this.backLogSectionTaskList.splice(this.backLogSectionTaskList.indexOf(taskIdent));
    }
    if(listIdent === this.titleNowCard){
      this.nowSectionTaskList.splice(this.nowSectionTaskList.indexOf(taskIdent));
    }
    if(listIdent === this.titleDelegateCard){
      this.delegateSectionTaskList.splice(this.delegateSectionTaskList.indexOf(taskIdent));
    }
    if(listIdent === this.titleOwnCard){
      this.ownSectionTaskList.splice(this.ownSectionTaskList.indexOf(taskIdent));
    }
    if(listIdent === this.titleTrashCard){
      this.trashSectionTaskList.splice(this.trashSectionTaskList.indexOf(taskIdent));
    }
  }
}
