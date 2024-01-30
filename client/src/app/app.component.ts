import { RouterModule, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PagesModule } from './pages/pages.module.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    PagesModule,

    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  opened = false;

  constructor(
    private _title: Title,
  ) {}

  ngOnInit(): void {
    this._title.setTitle('Qingque\'s Room');
  }
}
