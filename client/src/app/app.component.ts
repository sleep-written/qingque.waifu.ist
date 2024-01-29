import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { PagesModule } from './pages/pages.module.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    PagesModule,

    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client';
}
