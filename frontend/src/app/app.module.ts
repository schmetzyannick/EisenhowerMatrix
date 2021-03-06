import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TaskComponent} from './task/task.component';

/**
 * TODO: add comment.
 */
@NgModule({
    declarations: [AppComponent, TaskComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        DragDropModule,
        MatCheckboxModule,
        MatButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
