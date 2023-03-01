import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string="";

  @Output() login = new EventEmitter<{ username: string; password: string }>();

  submit() {
    this.login.emit({ username: this.username, password: this.password });
  }
}
