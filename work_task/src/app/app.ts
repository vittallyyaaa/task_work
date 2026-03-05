import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PasswordGeneratorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
