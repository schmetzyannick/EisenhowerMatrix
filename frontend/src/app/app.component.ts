import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public titleLeftAddSection = 'Done';
  public titleRigthAddSection = 'Backlog';
  public titleNowCard = 'Now';
  public titleOwnCard = 'Own';
  public titleDelegateCard = 'Delegate';
  public titleTrashCard = 'Trash';
}
