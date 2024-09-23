import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertBoxComponent, AlertBoxData } from '../alert-box.component';

@Injectable({
  providedIn: 'root'
})
export class AlertBoxService {

  constructor(private alertbox: MatDialog) {}

      //Alert
      confirmDialog(data: AlertBoxData): Observable<boolean> {
        return this.alertbox.open(AlertBoxComponent, {
          data,
          width: '400px',
          panelClass: 'alert-box-container',
          disableClose : true
        }).afterClosed();
      }
}
