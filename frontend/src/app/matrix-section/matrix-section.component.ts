import { Component, OnInit } from '@angular/core';
import { AbstrctPanelComponent } from '../abstractComponents/panel.component';

@Component({
  selector: 'app-matrix-section',
  templateUrl: './matrix-section.component.html',
  styleUrls: ['./matrix-section.component.scss'],
})
export class MatrixSectionComponent extends AbstrctPanelComponent implements OnInit {
}
