import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { AlertBoxService } from '../../../shared/components/alert-box/service/alert-box.service';

export interface OtherServData{
  id: number;
  title: string;
  image: string;
  description: string;
  location: string;
  contactinf: string;
  creationdate: Date;
  action:string;
}

@Component({
  selector: 'app-read-otro-serv',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, RouterModule, MatButton, MatIcon, HttpClientModule, MatTableModule, FlexLayoutModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatSort],
  templateUrl: './read-otro-serv.component.html',
  styleUrl: './read-otro-serv.component.scss'
})
export class ReadOtroServComponent implements OnInit, AfterViewInit{
  [x: string]: any;
  
    displayedColumns: string[] = ['id','title','description', 'contactinf', 'location', 'image', 'creationdate', 'action'];
    successmsg: any;
    dataSource!: MatTableDataSource<OtherServData>;
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort
    readData:any;
    dialog: any;
    table: any = 'other_services';
  
  
    constructor(private apiservice:ApiService, private alerboxservice:AlertBoxService) {
      this.ngOnInit();
    };
  
    ngOnInit(): void {
      this.getAllData();
    }
  
    ngAfterViewInit(): void {
      this.getAllData();
    }
  
    //delete user
    deleteID(id:any){
      this.alerboxservice.confirmDialog({
        title: 'Borrar Recurso',
        message: '¿Esta seguro que desea borrar este servicio?',
        comfirmText: 'Si',
        cancelText: 'No'
      }).subscribe(res =>{
        if(res){
            //DELETE
            //console.log(id,'deleteid==>');
              this.apiservice.deleteData(this.table,id).subscribe((res)=>{
                //console.log(res,'deleteres==>');
                this.successmsg = "El servicio ha sido borrado";
                setTimeout(() => 
                {
                  this.successmsg = undefined;
                },
                3000);  
                this.getAllData();
            });
        }
      });
    }
  
    //get Data
    getAllData() 
    {
      this.apiservice.getAllData(this.table).subscribe((res)=>{
        //console.log(res,"res==>");
        this.readData = res.data;
        //const reader = new FileReader;
        //reader.onload = this.readData;
        //console.log(this.readData);
        this.dataSource = new MatTableDataSource(this.readData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  
    //Filter
    applyFilter(event: Event)
    {
      const filterValue =(event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if(this.dataSource.paginator)
      {
        this.dataSource.paginator.firstPage()
      }
    }
  }
  
