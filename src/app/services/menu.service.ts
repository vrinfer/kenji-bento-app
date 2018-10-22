import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

import { Menu } from '../menu-list/menu';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(private http : HttpClient) { }

  //TODO eliminar el tap y usar otro catch del error para que muestre un mensaje amigable en pantalla.
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.getEndpointUrl()).pipe(
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

  private getEndpointUrl(): string {
    return environment.apiEndpointUrl + environment.menuEndpoint;
  }
}
