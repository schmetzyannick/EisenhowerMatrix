import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public desc: string;
  @Input('ident') ident: string;
  @Output() deleteInParent: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.desc = '';
    this.ident = '';
  }

  ngOnInit(): void {}

  public removeTask(): void{
    this.deleteInParent.emit(this.ident);
  }
}
