import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ITask} from 'src/utils/ITask';

/**
 * The Task component.
 */
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, ITask {
    @Input('desc') desc: string;
    @Input('ident') ident: string;
    @Input('listName') listName: string;
    @Input('doneState') doneState: boolean;
    @Input('priorityInList') priorityInList: number;
    @Output() deleteInParent: EventEmitter<[string, string]> = new EventEmitter();
    @Output() changeTaskValue: EventEmitter<[string, string, string, number]> = new EventEmitter();
    @Output() checkBoxClicked: EventEmitter<[string, string, boolean]> = new EventEmitter();

    constructor() {
        this.desc = '';
        this.ident = '';
        this.listName = '';
        this.doneState = false;
        this.priorityInList = -1;
    }

    /**
     * Angular init handler.
     */
    public ngOnInit(): void {
        //no op
    }

    /**
     * Change event emitter.
     */
    public sendChangeToParent(): void {
        this.changeTaskValue.emit([this.listName, this.ident, this.desc, this.priorityInList]);
    }

    /**
     * Delete event emitter.
     */
    public removeTask(): void {
        this.deleteInParent.emit([this.listName, this.ident]);
    }

    /**
     * Check event emitter.
     * @param checked Checked state.
     */
    public checkboxHandler(checked: boolean): void {
        this.doneState = checked;
        this.checkBoxClicked.emit([this.listName, this.ident, checked]);
    }
}
