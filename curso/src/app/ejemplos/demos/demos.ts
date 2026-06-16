/* eslint-disable @typescript-eslint/no-unused-vars */
import { JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { LoggerService } from '@my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { Notification } from "src/app/layout";

@Component({
  selector: 'app-demos',
  imports: [JsonPipe, Notification],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [ NotificationService ]
})
export class Demos {
  private readonly logger= inject(LoggerService)

  // Ejemplo de servicios
  constructor(public vm: NotificationService) {
    // effect(() => {
    //   if (this.vm.HayNotificaciones() && this.vm.Listado()[this.vm.Listado().length - 1].Type === NotificationType.error) {
    //     window.alert(`Efecto: ${this.vm.Listado()[this.vm.Listado().length - 1].Message}`);
    //     this.vm.remove(this.vm.Listado().length - 1);
    //   }
    // })
   }

  // private suscriptor: Unsubscribable | undefined;
  // ngOnInit(): void {
  //   this.suscriptor = this.vm.Notificacion.subscribe(n => {
  //     if (n.Type !== NotificationType.error) { return; }
  //     window.alert(`Suscripción: ${n.Message}`);
  //     this.vm.remove(this.vm.Listado().length - 1);
  //   });
  // }
  // ngOnDestroy(): void {
  //   if (this.suscriptor) {
  //     this.suscriptor.unsubscribe();
  //   }
  // }

  // ejemplo de servicios
  // constructor(private logger: LoggerService) {
  // constructor() {
  //   this.logger = inject(LoggerService)
  //   this.logger.error('es un error')
  //   this.logger.warn('es un warn')
  //   this.logger.info('es un info')
  //   this.logger.log('es un log')
  // }

  // ejemplo de señales
  // readonly conSignal = signal(0)
  // readonly doble = computed(() => this.conSignal() * 2)
  // sinSignal = 0

  // constructor() {
  //   setInterval(() => this.conSignal.update(value => value + 1), 3_000)
  //   setInterval(() => this.sinSignal++, 1_000)
  //   effect(() => {
  //     console.log(`Contador: ${this.conSignal()}`)
  //   })
  // }

  // addSignal() {
  //   this.conSignal.update(value => value + 1)
  // }
  // addSinSignal() {
  //   this.sinSignal++
  // }
  // readonly file = signal<Blob | undefined>(undefined)
  // readonly lector = resource({
  //   params: () => ({ file: this.file() }),
  //   loader: ({ params }) => new Promise((resolve, reject) => {
  //     if (!params.file) reject('Falta el fichero')
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = () => reject(reader.error);
  //     reader.readAsText(params.file as Blob);
  //   })
  // })

}
