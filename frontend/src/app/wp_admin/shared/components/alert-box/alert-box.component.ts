import { CommonModule } from '@angular/common';
import { Component, Inject,  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface AlertBoxData{
  title: string;
  message: string;
  comfirmText: string;
  cancelText: string;
}

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatIconModule],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.scss'
})
export class AlertBoxComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertBoxData, public dialogRef: MatDialogRef<AlertBoxComponent>){}

  closeDialog(){
    this.dialogRef.close(false);
  }
}
