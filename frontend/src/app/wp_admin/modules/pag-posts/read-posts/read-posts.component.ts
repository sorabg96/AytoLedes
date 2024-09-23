import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertBoxService } from '../../../shared/components/alert-box/service/alert-box.service';
import { ApiService } from '../../../../services/api.service';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface PostsData{
  id: number;
  postname: string;
  image: string;
  description: string;
  images: string;
  pdf:string;
  creationdate: Date;
  action:string;
}

@Component({
  selector: 'app-read-post',
  standalone: true,
  imports: [MatTooltipModule, CommonModule, RouterModule, MatButton, MatIcon, HttpClientModule, MatTableModule, FlexLayoutModule, MatPaginatorModule, MatSortModule, MatInputModule, MatFormFieldModule, MatSort],
  providers:[ApiService],
  templateUrl: './read-posts.component.html',
  styleUrl: './read-posts.component.scss',
})
export class ReadPostsComponent implements OnInit, AfterViewInit{
[x: string]: any;

  displayedColumns: string[] = ['id', 'postname', 'image', 'description', 'images', 'pdf', 'creationdate', 'action'];
  successmsg: any;
  dataSource!: MatTableDataSource<PostsData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  readData:any;
  dialog: any;
  table: any = 'posts';


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
      message: '¿Esta seguro que desea borrar esta noticia?',
      comfirmText: 'Si',
      cancelText: 'No'
    }).subscribe(res =>{
      if(res){
          //DELETE
          //console.log(id,'deleteid==>');
            this.apiservice.deleteData(this.table,id).subscribe((res)=>{
              //console.log(res,'deleteres==>');
              this.successmsg = "La noticia ha sido borrado";
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


