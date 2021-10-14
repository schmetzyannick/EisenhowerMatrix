import { Component, OnInit, Input } from '@angular/core';
import {AbstrctPanelComponent} from "../abstractComponents/panel.component";

@Component({
  selector: 'app-additional-section',
  templateUrl: './additional-section.component.html',
  styleUrls: ['./additional-section.component.scss']
})
export class AdditionalSectionComponent extends AbstrctPanelComponent implements OnInit {
}
