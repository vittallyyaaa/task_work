import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../envirovments/envirovments'; 

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'https://api.api-ninjas.com/v1/passwordgenerator';

  constructor(private http: HttpClient) {}

  generate(length: number = 12): Observable<any> {
    // Створюємо заголовки з вашим API ключем
    const headers = new HttpHeaders({
      'X-Api-Key': environment.apiKey
    });

    return this.http.get<any>(`${this.apiUrl}?length=${length}`, { headers });
  }
}