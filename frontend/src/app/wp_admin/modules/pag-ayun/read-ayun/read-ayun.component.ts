import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { AlertBoxService } from '../../../shared/components/alert-box/service/alert-box.service';
import { MatDividerModule } from '@angular/material/divider';

export interface MunicipalCorporationData{
  id: number;
  politicalParty: string;
  fullname: string;
  politicalOffice: string;
  email: string;
  image: string;
  action:string;
}

export interface PoliticalPartyData{
  id: number;
  title: string;
  image: string;
  orden: Date;
  action:string;
}

@Component({
  selector: 'app-read-ayun',
  standalone: true,
  imports: [MatTooltipModule, MatDividerModule, CommonModule, RouterModule, MatButton, MatIcon, HttpClientModule, MatTableModule, FlexLayoutModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatSort],
  templateUrl: './read-ayun.component.html',
  styleUrl: './read-ayun.component.scss'
})
export class ReadAyunComponent implements OnInit, AfterViewInit{
  [x: string]: any;
  
    displayedColumns: string[] = ['id','politicalParty','fullname', 'politicalOffice', 'email', 'image', 'action'];
    displayedColumns1: string[] = ['id','title','orden', 'image', 'action'];
    successmsg: any;
    dataSource!: MatTableDataSource<MunicipalCorporationData>;
    dataSource1!: MatTableDataSource<PoliticalPartyData>;
    @ViewChild(MatPaginator) paginator!: MatPaginator
    @ViewChild(MatSort) sort!: MatSort
    readDataMC:any;
    readDataG:any;
    readDataPP:any;
    dialog: any;
    table1: any = 'municipal_corporation';
    table2: any = 'greetings';
    table3: any = 'politicalparty';
  
  
    constructor(private apiservice:ApiService, private alerboxservice:AlertBoxService) {
      this.ngOnInit();
    };
  
    ngOnInit(): void {
      this.getAllDataMC();
      this.getAllDataG();
      this.getAllDataPP();
    }
  
    ngAfterViewInit(): void {
      this.getAllDataMC();
      this.getAllDataG();
      this.getAllDataPP();
    }
  
    //delete municipal coorporation
    deleteIDMC(id:any){
      this.alerboxservice.confirmDialog({
        title: 'Borrar Recurso',
        message: '¿Esta seguro que desea borrar a este cargo politico?',
        comfirmText: 'Si',
        cancelText: 'No'
      }).subscribe(res =>{
        if(res){
            //DELETE
            //console.log(id,'deleteid==>');
              this.apiservice.deleteData(this.table1,id).subscribe((res)=>{
                //console.log(res,'deleteres==>');
                this.successmsg = "El cargo politico ha sido borrado";
                setTimeout(() => 
                {
                  this.successmsg = undefined;
                },
                3000);  
                this.getAllDataMC();
            });
        }
      });
    }
  

    //delete political party
    deleteIDPP(id:any){
      this.alerboxservice.confirmDialog({
        title: 'Borrar Recurso',
        message: '¿Esta seguro que desea borrar a este partido politico?',
        comfirmText: 'Si',
        cancelText: 'No'
      }).subscribe(res =>{
        if(res){
            //DELETE
            //console.log(id,'deleteid==>');
              this.apiservice.deleteData(this.table3,id).subscribe((res)=>{
                //console.log(res,'deleteres==>');
                this.successmsg = "El partido politico ha sido borrado";
                setTimeout(() => 
                {
                  this.successmsg = undefined;
                },
                3000);  
                this.getAllDataPP();
            });
        }
      });
    }


    //get Data Municipal corporation
    getAllDataMC() 
    {
      this.apiservice.getAllData(this.table1).subscribe((res)=>{
        //console.log(res,"res==>");
        this.readDataMC = res.data;
        //const reader = new FileReader;
        //reader.onload = this.readData;
        //console.log(this.readData);
        this.dataSource = new MatTableDataSource(this.readDataMC);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }


        //get Data Political Party
        getAllDataPP() 
        {
          this.apiservice.getAllData(this.table3).subscribe((res)=>{
            //console.log(res,"res==>");
            this.readDataPP = res.data;
            //const reader = new FileReader;
            //reader.onload = this.readData;
            //console.log(this.readData);
            this.dataSource1 = new MatTableDataSource(this.readDataPP);
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
          });
        }

    //get Data Greetings
    getAllDataG() 
    {
      this.apiservice.getAllData(this.table2).subscribe((res)=>{
        //console.log(res,"res==>");
        this.readDataG = res.data;
      });
    }
  
    //Filter MC
    applyFilterMC(event: Event)
    {
      const filterValue =(event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if(this.dataSource.paginator)
      {
        this.dataSource.paginator.firstPage()
      }
    }

        //Filter PP
        applyFilterPP(event: Event)
        {
          const filterValue =(event.target as HTMLInputElement).value;
          this.dataSource1.filter = filterValue.trim().toLowerCase();
      
          if(this.dataSource1.paginator)
          {
            this.dataSource1.paginator.firstPage()
          }
        }

}
