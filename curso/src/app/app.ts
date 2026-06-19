import { Component, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Header, Footer, Notification, NotificationModal, AjaxWait } from "./layout";
import { RootViewContainerRefService } from './common-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Notification, NotificationModal, AjaxWait],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(view: RootViewContainerRefService, rootViewContainerRef: ViewContainerRef) {
    view.RootViewContainerRef = rootViewContainerRef;
  }
}
