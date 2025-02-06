import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-listNavbar',
  standalone: true,
  imports: [FormsModule, NgFor, MatIcon, RouterModule],
  styleUrl: './list.component.css',

  template: `
  <nav class="navbar navbar-expand-sm bg-primary sticky-top">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">

          <!-- dropdown -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Articoli
            </a>
            <ul class="dropdown-menu">
              <li *ngFor="let page of Routes; let i=index">
                <a class="dropdown-item" routerLink="/{{page.path}}">{{page.path}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
})

export class ListNavbarComponent{
  Routes =routes .filter(page=>page.show)
}