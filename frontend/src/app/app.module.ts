import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatrixSectionComponent } from './matrix-section/matrix-section.component';
import { AdditionalSectionComponent } from './additional-section/additional-section.component';

@NgModule({
  declarations: [AppComponent, MatrixSectionComponent, AdditionalSectionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
