import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class BookGuardService implements CanActivate {

  constructor(private _router: Router,
              private _snackBar: MatSnackBar,
              private _dataService: DataService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = +route.url[0].path;
    if (isNaN(id) || id <1) {
      this.updateMessage(`This book id is ${id}.`, 'ERROR');
      this._router.navigate(['/collection']);
      return false;
    }
    this._dataService.canActivate(id)
      .subscribe(response => {
        if (!response) {
          this.updateMessage(`${id} is not a valid Book Id.`, 'ERROR');
          this._router.navigate(['/collection']);
          return response;
        }
      },
      error => {
        this.updateMessage(<any>error, 'ERROR');
        return false;
      });

    return true;
  }

  updateMessage(message: string, type: string) : void {
    if (message) {
      this._snackBar.open(`${type}: ${message}`, 'DISMISS', {
        duration: 3000
      });
    }
  }
}
