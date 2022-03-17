import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  // Error handling
  handleError(error: any) {
    let errorMessage = (error.error instanceof ErrorEvent)
      // Get client-side error
      ? error.error.message
      // Get server-side error
      : `Error Code: ${error.status}\nMessage: ${error.message}`;

    window.alert(errorMessage);

    return throwError(() => errorMessage);
  }
}
