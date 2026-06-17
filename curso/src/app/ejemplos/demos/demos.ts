/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe, ElipsisPipe, ExecPipe, LoggerService, Sizer, StripTagsPipe } from '@my-library';
import { Unsubscribable } from 'rxjs';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { Notification } from "src/app/layout";
import GraficoSvg from '../grafico-svg/grafico-svg';
import { Card, FormButtons } from 'src/app/common-component';
import { SimboloDecimal, Calculadora } from '../calculadora/calculadora';

@Component({
  selector: 'app-demos',
  imports: [JsonPipe, Notification, CommonModule, FormsModule,
    StripTagsPipe, ElipsisPipe, CapitalizePipe, Sizer, GraficoSvg,
    FormButtons, Card, Calculadora, ExecPipe,
  ],
  templateUrl: './demos.html',
  styleUrl: './demos.css',
  // providers: [NotificationService]
})
export class Demos {
  private readonly logger = inject(LoggerService)

  readonly nombre = signal<string>('mundo')
  readonly fontSize = signal<number>(24)
  readonly listado = signal([
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'barcelona' },
    { id: 3, nombre: 'SEVILLA' },
    { id: 4, nombre: 'ciudad Real' },
  ])
  readonly idProvincia = signal<number>(2)
  readonly total = computed(() => this.listado().length)

  fecha = new Date('2026-06-17')

  public get Fecha(): string { return this.fecha.toISOString().substring(0, 10) }
  public set Fecha(value: string) {
    const f = new Date(value)
    if (f.toString() === 'Invalid Date' || f === this.fecha) return
    this.fecha = f
  }

  readonly resultado = signal<string>('')
  readonly visible = signal<boolean>(true)
  readonly estetica = signal({ importante: true, error: false, urgente: true })

  saluda() {
    this.resultado.set(`Hola ${this.nombre()}`)
  }

  despide() {
    this.resultado.set(`Adios ${this.nombre()}`)
  }

  di(algo: string) {
    this.resultado.set(`Dice ${algo}`)
  }

  cambia() {
    this.visible.update(value => !value)
    // const kk = this.estetica()
    // kk.importante = !kk.importante
    // this.estetica.set({ ...kk})
    this.estetica.update(value => ({ ...value, importante: !value.importante, error: !value.error }))
  }

  constructor() {
    this.calculo = this.calculo.bind(this)
  }
  cont = 0
  calculo(a: number, b: number) {
    this.logger.log(`Calculo: ${++this.cont}`)
    return a + b
  }

  add(provincia: string) {
    const id = this.listado()[this.listado().length - 1].id + 1
    this.listado.update(value => [...value, { id, nombre: provincia }])
    this.idProvincia.set(id)
    // this.listado.set([])
  }

  // Ejemplo de servicios
  // constructor(public vm: NotificationService) {
  //   effect(() => {
  //     if (this.vm.HayNotificaciones() && this.vm.Listado()[this.vm.Listado().length - 1].Type === NotificationType.error) {
  //       window.alert(`Efecto: ${this.vm.Listado()[this.vm.Listado().length - 1].Message}`);
  //       this.vm.remove(this.vm.Listado().length - 1);
  //     }
  //   })
  //  }

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

  // Ejemplo de Calculadora

  idiomas = signal([
    { codigo: 'en-US', region: 'USA' },
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portugal' },
  ]).asReadonly();
  idioma = signal(this.idiomas()[0].codigo);
  calculos = signal<Calculo[]>([]);
  valCalculadora = signal(666);
  simbolo: SimboloDecimal = ','

  ponResultado(origen: string, valor: number) {
    this.calculos.update(value => [ ...value, {
      pos: this.calculos.length + 1,
      origen,
      valor: +valor
    }]);
  }
}
interface Calculo {
  pos: number
  origen: string
  valor: number
}
