import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-additional-section',
  templateUrl: './additional-section.component.html',
  styleUrls: ['./additional-section.component.scss']
})
export class AdditionalSectionComponent implements OnInit {

  @Input() title: string;

  constructor() { 
    this.title = "";
  }

  ngOnInit(): void {
  }

}
