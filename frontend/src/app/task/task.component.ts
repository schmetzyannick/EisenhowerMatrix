import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input('desc') desc: string;
  @Input('ident') ident: string;
  @Input('listName') listName: string;
  @Output() deleteInParent: EventEmitter<[string, string]> = new EventEmitter();
  @Output() changeTaskValue: EventEmitter<[string, string, string]> = new EventEmitter();

  constructor() {
    this.desc = '';
    this.ident = '';
    this.listName = '';
  }

  ngOnInit(): void {}

  public sendChangeToParent(): void{
    this.changeTaskValue.emit([this.listName, this.ident, this.desc]);
  }

  public removeTask(): void{
    this.deleteInParent.emit([this.listName, this.ident]);
  }
}
