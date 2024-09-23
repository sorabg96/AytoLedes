import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private _http:HttpClient) { }

    //refresh
    private refreshSubject = new Subject<void>();
    refresh = this.refreshSubject.asObservable();

    triggerRefresh():void {
      this.refreshSubject.next();
    }
    
    //delatfooter
    load=true;
    delaycomponent() {
      if (this.load) {
        return true;
      }else{
        return false;
      }
    }

    //connect frontend to backend

    apiUrl = 'http://localhost:3000';

    //get all data

    getAllData(table:any):Observable<any>
    { 
      let tables = table;
      return this._http.get(`${this.apiUrl}/${tables}`); 
    }

    //create data
    createData(table:any,data:any):Observable<any>
    { 
      //console.log(data,'createapi=>');
      let tables = table;
      return this._http.post(`${this.apiUrl}/${tables}`,data);
    }

    //login
    login(data:any):Observable<any>
    { 
      //console.log(data,'login=>');
      return this._http.post(`${this.apiUrl}/login`,data,{withCredentials:true});
    }

    //profile
    profilelogin():Observable<any>
    { 
      return this._http.get(`${this.apiUrl}/profile`,{withCredentials:true});
    }

    //logout
    logout():Observable<any>
    { 
      //console.log(data,'login=>');
      return this._http.post(`${this.apiUrl}/logout`,{},{withCredentials:true});
    }

    //delete data
    deleteData(table:any,id:any):Observable<any>
    { 
      //console.log(id,'deleteapi=>');
      let tables = table;
      let ids = id;
      return this._http.delete(`${this.apiUrl}/${tables}/${ids}`);
    }

    //update data
    updateData(table:any,data:any,id:any):Observable<any>
    {
      let tables = table;
      let ids = id;
      return this._http.put(`${this.apiUrl}/${tables}/${ids}`,data);
    }

    //get single Data
    getSingleData(table:any,id:any):Observable<any>
    {
      let tables = table;
      let ids = id;
      return this._http.get(`${this.apiUrl}/${tables}/${ids}`);
    }



}
