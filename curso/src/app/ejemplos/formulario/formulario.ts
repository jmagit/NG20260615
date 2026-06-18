import { JsonPipe } from '@angular/common';
import { HttpContext } from '@angular/common/http';
import { Component, inject, Service, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorMessagePipe, NIFNIEValidator, NotblankValidator, TypeValidator, UppercaseValidator } from '@my-library';
import { FormButtons } from 'src/app/common-component';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { RESTDAOService } from 'src/app/core';
import { AUTH_REQUIRED } from 'src/app/security';

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
class PersonasDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('personas', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
}
@Service()
class LibrosDAOService extends RESTDAOService<unknown, number> {
  constructor() {
    super('libros', { context: new HttpContext().set(AUTH_REQUIRED, true) })
  }
}

@Service()
export class PersonasViewModelService {
  private readonly notify = inject(NotificationService)
  private readonly dao = inject(PersonasDAOService)
  Modo = signal<Mode>('add')
  Elemento = signal<Persona>({ ...INIT_VALUE })

  add() {
    this.Elemento.set({ ...INIT_VALUE })
    this.Modo.set('add')
  }
  edit(key: number) {
    this.dao.get(key).subscribe({
      next: data => {
        this.Elemento.set(data)
        this.Modo.set('edit')
      },
      error: err => this.notify.add(JSON.stringify(err))
    })
    // this.Elemento.set({ id: key, nombre: 'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '4g' })
    // this.Modo.set('edit')
  }

  cancel() {
    this.Elemento.set({ ...INIT_VALUE })
  }

  send() {
    switch (this.Modo()) {
      case 'add':
        this.dao.add(this.Elemento()).subscribe({
          next: () => this.cancel(),
          error: err => this.notify.add(JSON.stringify(err))
        })
        // this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`, NotificationType.info)
        // this.cancel()
        break
      case 'edit':
        this.dao.change(this.Elemento().id ?? 0, this.Elemento()).subscribe({
          next: () => this.cancel(),
          error: err => this.notify.add(JSON.stringify(err))
        })
        // this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`, NotificationType.warn)
        // this.cancel()
        break
    }
  }
}

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, ErrorMessagePipe, NIFNIEValidator, TypeValidator, UppercaseValidator,
    NotblankValidator, FormButtons, JsonPipe ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  public readonly VM = inject(PersonasViewModelService)
  public readonly dao = inject(LibrosDAOService)

  listado: unknown[] = []
  lista() {
this.dao.query().subscribe({
  next: data => this.listado = data
})
  }
}
