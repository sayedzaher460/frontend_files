import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav-app',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-app.component.html',
  styleUrl: './nav-app.component.scss'
})
export class NavAppComponent {

}
