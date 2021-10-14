import { Component, Input } from '@angular/core';

@Component({
  template: ""
})
export abstract class AbstrctPanelComponent {
  @Input() title: string;
  public tasks: string[];

  constructor() {
    this.title = '';
    this.tasks = [];
  }

  ngOnInit(): void {}

  public addTask(): void {
    this.tasks.push('Task' + (this.tasks.length + 1));
  }
}
