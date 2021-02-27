import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShopService {

    apiUrl: string = environment.WebAPI;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.apiUrl}/products`)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    getItemBy(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiUrl}/products/${id}`)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    createItem(item: Item): Observable<Item> {
        return this.http.post<Item>(`${this.apiUrl}/products/`, JSON.stringify(item), this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    deleteItem(id: number) {
        return this.http.delete(`${this.apiUrl}/products/${id}`, this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    updateItem(item: Item, id: number) {
        return this.http.put(`${this.apiUrl}/products/${id}`, JSON.stringify(item), this.httpOptions)
            .pipe(
                catchError(this.errorHandler)
            );
    }

    errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}