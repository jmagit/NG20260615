import { JsonPipe } from '@angular/common';
import { HttpContext } from '@angular/common/http';
import { Component, effect, inject, linkedSignal, Service, signal } from '@angular/core';
import {
  email,
  FieldContext,
  form,
  FormField,
  hidden,
  max,
  maxDate,
  maxLength,
  min,
  minLength,
  pattern,
  readonly,
  required,
  SchemaPath,
  validate,
  ValidationResult,
  submit,
  FormRoot,
} from '@angular/forms/signals';
import { ErrorToTextPipe } from '@my-library';
import { FormButtons } from 'src/app/common-component';
import { NotificationService, NotificationType } from 'src/app/common-services';
import { RESTDAOService } from 'src/app/core';
import { AUTH_REQUIRED } from 'src/app/security';

type Mode = 'add' | 'edit';

interface Persona {
  [index: string]: unknown;
  id?: number;
  nombre: string;
  apellidos?: string;
  edad?: number;
  correo?: string;
  nif?: string;
}

const init_value: Persona = {
  id: 0,
  nombre: '',
  apellidos: undefined,
  edad: undefined,
  correo: undefined,
  nif: undefined,
};

@Service()
class PersonasDAOService extends RESTDAOService<Persona, number> {
  constructor() {
    super('personas');
  }
}

@Service()
class PersonasViewModelService {
  private readonly notify = inject(NotificationService);
  private readonly dao = inject(PersonasDAOService);
  Modo = signal<Mode>('add');
  Elemento = signal<Persona>({ ...init_value });

  add() {
    this.Elemento.set({ ...init_value });
    this.Modo.set('add');
  }
  edit(key: number) {
    this.dao.get(key).subscribe({
      next: (data) => {
        this.Elemento.set(data);
        this.Modo.set('edit');
      },
      error: (err) => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`),
    });
    // this.Elemento.set({ id: key, nombre: 'Pepito', apellidos: 'Grillo', edad: 99, correo: 'pgrillo@example.com', nif: '4g'})
    // this.Modo.set('edit')
  }

  cancel() {
    // this.Elemento.set({...porDefecto})
  }

  send() {
    switch (this.Modo()) {
      case 'add':
        // this.dao.add(this.Elemento()).subscribe({
        //   next: _data => {
        //     this.cancel()
        //   },
        //   error: err => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`)
        // })
        this.notify.add(`POST: ${JSON.stringify(this.Elemento())}`, NotificationType.info);
        this.cancel();
        break;
      case 'edit':
        // if (this.Elemento().id) {
        //   this.dao.change(this.Elemento().id as number, this.Elemento()).subscribe({
        //     next: _data => {
        //       this.cancel()
        //     },
        //     error: err => this.notify.add(`${err.status}: ${JSON.stringify(err.body)}`)
        //   })
        // }
        this.notify.add(`PUT: ${JSON.stringify(this.Elemento())}`, NotificationType.warn);
        this.cancel();
        break;
    }
  }
}

// function nifnieValidator(field: FieldContext<string>): ValidationResult
function nifnie(path: SchemaPath<string>, options?: { message?: string }): ValidationResult {
  validate(path, ({ value }) => {
    if (!value()) {
      return null;
    }
    const err = {
      kind: 'nifnie',
      invalidFormat: true,
      invalidChar: true,
      message: options?.message ?? `${value()} no es un NIF o NIE valido`,
    };
    if (/^((\d{1,8})|([X-Z]\d{7}))[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(value().toUpperCase())) {
      const charsValue: Record<string, string> = { X: '0', Y: '1', Z: '2' };
      const numberValue = +(value() as string)
        .slice(0, -1)
        .replace(/[X,Y,Z]/g, (char) => charsValue[char]);
      err.invalidFormat = false;
      return value()
        .toUpperCase()
        .endsWith('TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23))
        ? null
        : err;
    } else {
      return err;
    }
  });
}

interface form_model {
  [index: string]: unknown;
  id: number;
  nombre: string;
  apellidos: string;
  edad: number | null;
  correo: string;
  nif: string;
  fecha: Date;
}

const form_empty: form_model = {
  id: -1,
  nombre: '',
  apellidos: '',
  edad: null,
  correo: '',
  nif: '',
  fecha: new Date(), //.toISOString().substring(0, 10)
};

@Component({
  selector: 'app-formulario-con-signal',
  imports: [FormField, FormRoot, FormButtons, JsonPipe, ErrorToTextPipe],
  templateUrl: './formulario-con-signal.html',
  styleUrl: './formulario-con-signal.css',
})
export class FormularioConSignal {
  vm = inject(PersonasViewModelService);

  private readonly formModel = linkedSignal({
    source: this.vm.Elemento,
    computation: (domainModel) => {
      // if(this.fieldsTree && this.fieldsTree().dirty()) return
      const model = { ...form_empty } as form_model;
      if (domainModel) {
        for (const prop in domainModel) {
          if (prop in model && domainModel[prop] != null) model[prop] = domainModel[prop];
        }
      }
      return model;
    },
    // equal: (a, b) => {
    //   for(const prop in a)
    //     if(a[prop] !== b[prop]) return false
    //   return true
    // }
  });
  // private readonly toDomain = effect(() => {
  //   if (this.fieldsTree().valid()) {
  //     this.vm.Elemento.update((value) => {
  //       const domainModel = { ...value };
  //       const model = this.fieldsTree().value();
  //       for (const prop in model) {
  //         if (prop in domainModel && domainModel[prop] !== model[prop])
  //           domainModel[prop] = model[prop];
  //       }
  //       return domainModel;
  //     });
  //   }
  // });
  fieldsTree = form(
    this.formModel,
    (sch) => {
      hidden(sch.id, { when: () => this.vm.Modo() !== 'add' });
      required(sch.id);
      required(sch.nombre, { message: 'es obligatorio' });
      minLength(sch.nombre, 2);
      maxLength(sch.nombre, 10);
      // validate(sch.nombre, () => { })
      minLength(sch.apellidos, 2);
      maxLength(sch.apellidos, 10);
      pattern(sch.apellidos, /[A-Z ]+/, { message: 'Debe estar en mayúsculas' });
      min(sch.edad, 16);
      max(sch.edad, 67);
      email(sch.correo);
      // validate(sch.nif, nifnieValidator);
      nifnie(sch.nif);
      maxDate(sch.fecha, new Date());
    },
    {
      submission: {
        action: async (fields) => {
          if (fields().valid()) {
            this.vm.Elemento.update((value) => {
              const domainModel = { ...value };
              const model = fields().value();
              for (const prop in model) {
                if (prop in domainModel && model[prop] && domainModel[prop] !== model[prop])
                  domainModel[prop] = model[prop];
              }
              return domainModel;
            });
            this.vm.send();
          }
        },
      },
    },
  );

  send() {
    // submit(this.fieldsTree, { action: async () => {

    //   }})
    if (this.fieldsTree().valid()) {
      this.vm.Elemento.update((value) => {
        const domainModel = { ...value };
        const model = this.fieldsTree().value();
        for (const prop in model) {
          if (prop in domainModel && model[prop] && domainModel[prop] !== model[prop])
            domainModel[prop] = model[prop];
        }
        return domainModel;
      });
      this.vm.send();
    }
  }
}
