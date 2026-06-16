/* eslint-disable @typescript-eslint/no-unused-vars */
import { JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { LoggerService } from '@my-library';

@Component({
  selector: 'app-demos',
  imports: [ JsonPipe ],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
})
export class Demos {
  private readonly logger: LoggerService

  // constructor(private logger: LoggerService) {
  constructor() {
    this.logger = inject(LoggerService)
    this.logger.error('es un error')
    this.logger.warn('es un warn')
    this.logger.info('es un info')
    this.logger.log('es un log')
  }

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
