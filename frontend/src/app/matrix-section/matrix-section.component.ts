import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matrix-section',
  templateUrl: './matrix-section.component.html',
  styleUrls: ['./matrix-section.component.scss'],
})
export class MatrixSectionComponent implements OnInit {
  @Input() title: string;

  constructor() {
    this.title = '';
  }

  ngOnInit(): void {}
}
