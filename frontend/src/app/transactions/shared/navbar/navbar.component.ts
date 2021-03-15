import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      button,
      mat-icon {
        cursor: pointer;
      }
      #app-title {
        margin-left: 20px;
        font-weight: bold;
      }
      #sidenav-title {
        display: block;
        margin: 0 auto;
      }
      .active {
        background: rgba(0, 0, 0, 0.04);
      }
      .menu-option {
        padding: 4px;
      }
      .container {
        margin: 50px;
      }
      .bienvenida {
        margin-right: 20px !important;
        font-size: 14px;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
