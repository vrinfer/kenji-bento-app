import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { Menu } from './menu';

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  private serviceUrl = 'http://localhost:3000/menus';

  constructor(private http : HttpClient) { }

  //TODO eliminar el tap y usar otro catch del error para que muestre un mensaje amigable en pantalla.
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.serviceUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        errorMessage = 'An error occuerred: ${err.error.message}';
    } else {
        errorMessage = 'Server returnoed code: ${err.status}, error message is: $ {err.message}';
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
