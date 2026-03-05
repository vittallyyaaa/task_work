import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService } from '../../services/password';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-generator.html',
  styleUrls: ['./password-generator.scss']
})
export class PasswordGeneratorComponent {
  passwordLength = 12;
  generatedPassword = '';
  isLoading = false;
  errorMsg = '';
  isCopied = false;

  constructor(
    private passwordService: PasswordService,
    private cdr: ChangeDetectorRef  
  ) {}

  onGenerate() {

    if (this.passwordLength < 8) {
      this.passwordLength = 8;
    } else if (this.passwordLength > 32) {
      this.passwordLength = 32;
    }

    this.generatedPassword = '';
    this.isLoading = true;
    this.errorMsg = '';

    this.passwordService.generate(this.passwordLength).subscribe({
      next: (response) => {
        this.generatedPassword = response.random_password;
        this.isLoading = false;
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Помилка запиту:', err);
        this.errorMsg = 'Не вдалося отримати пароль.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  copyToClipboard() {
    if (!this.generatedPassword) return;

    navigator.clipboard.writeText(this.generatedPassword).then(() => {
      this.isCopied = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.isCopied = false;
        this.cdr.detectChanges();
      }, 2000);
    });
  }
}