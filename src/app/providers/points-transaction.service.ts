import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const URL = environment.devPath;

@Injectable({
  providedIn: 'root'
})
export class PointsTransactionService {
  car_id = '';
  token:any;
  header:any;
  page_transaction:number = 1;
  car_select:any
  constructor(private http: HttpClient, private storage: Storage) { }

  getPointsTransactions(pull: boolean = false, token, car_id) {
    this.token = token
    let headers = new HttpHeaders({ 
      'Content-Type': 'application/json' ,
      'Authorization': this.token,
    });
    if (pull) {
      this.page_transaction = 1;
    }
    this.page_transaction++;
    console.log(`${URL}points_transactions/${car_id}/${this.page_transaction}`)
    return this.http.get(`${URL}points_transactions/1/${this.page_transaction}`, {headers:headers})
  }
}
