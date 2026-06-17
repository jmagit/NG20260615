import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, Footer, Notification, NotificationModal } from "./layout";
import { RootViewContainerRefService } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Notification, NotificationModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(view: RootViewContainerRefService, rootViewContainerRef: ViewContainerRef) {
    view.RootViewContainerRef = rootViewContainerRef;
  }
}
