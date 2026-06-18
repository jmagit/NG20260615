import { Component, inject, Service, signal } from '@angular/core';
import { NotificationService, NotificationType } from 'src/app/common-services';

type Mode = 'add' | 'edit'

interface Persona {
  id?: number
  nombre: string
  apellidos?: string
  edad?: number
  correo?: string
  nif?: string
}

const INIT_VALUE: Persona = { nombre: '' }

@Service()
export class PersonasViewModelService {
  private readonly notify = inject(NotificationService)
  Modo = signal<Mode>('add')
  Elemento = signal<Persona>({ ...INIT_VALUE })

  add() {
    this.Elemento.set({ ...INIT_VALUE })
    this.Modo.set('add')
  }
  edit(key: number) {
    this.Elemento.set({ id: key, nombre: 'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '4g' })
    this.Modo.set('edit')
  }

  cancel() {
    this.Elemento.set({ ...INIT_VALUE })
  }

  send() {
    switch (this.Modo()) {
      case 'add':
        this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`, NotificationType.info)
        this.cancel()
        break
      case 'edit':
        this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`, NotificationType.warn)
        this.cancel()
        break
    }
  }
}

@Component({
  selector: 'app-formulario',
  imports: [],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  public readonly VM = inject(PersonasViewModelService)
}
