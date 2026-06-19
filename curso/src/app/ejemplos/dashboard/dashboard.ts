import { Component, computed, signal } from '@angular/core';
import { Home } from 'src/app/layout';
import { LoginForm } from 'src/app/security';
import { Calculadora } from '../calculadora/calculadora';
import { Formulario } from '../formulario/formulario';
import { Demos } from '../demos/demos';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [ NgComponentOutlet ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard {
    menu = [
    { texto: 'inicio', icono: 'fa-solid fa-house', componente: Home },
    { texto: 'demos', icono: 'fa-solid fa-person-chalkboard', componente: Demos },
    { texto: 'calculadora', icono: 'fa-solid fa-calculator', componente: Calculadora },
    { texto: 'formulario', icono: 'fa-solid fa-chalkboard-user', componente: Formulario },
    { texto: 'login', icono: 'fa-solid fa-image', componente: LoginForm },
  ]
  actual = signal(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cuerpo = computed<any>(() => this.menu[this.actual()]?.componente)
}
