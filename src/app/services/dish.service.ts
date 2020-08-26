import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { resolve } from 'url';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) {

   }
   getDishes():Observable<Dish[]>{
     //return Promise.resolve(DISHES);
    /*  return new Promise(resolve =>{
       setTimeout(() => resolve(DISHES),2000);
     }) */
     //return of(DISHES).pipe(delay(2000)).toPromise();// Obeservable returning promise itself
     //return of(DISHES).pipe(delay(2000));
     //return this.http.get<Dish[]>(baseURL + 'dishes');
     console.log(baseURL + 'dishes');
     return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
   }
   getDish(id:string): Observable<Dish>{
    //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
   /*  return new Promise(resolve =>{
      setTimeout(()=> resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
    }) */
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
    
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    //return this.http.get<Dish>(baseURL + 'dishes/' +id);
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
  getFeaturedDish(): Observable<Dish>{
     // Simulate server latency with 2 second delay
   /*  return  new Promise(resolve=> {     
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    }); */
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    //return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));

    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getDishIds(): Observable<string[] | any>{
    //return of(DISHES.map(dish => dish.id));
    //return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(this.processHTTPMsgService.handleError));
 }
 putDish(dish:Dish): Observable<Dish>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions).pipe(
    catchError(this.processHTTPMsgService.handleError)
  )
 }
}
