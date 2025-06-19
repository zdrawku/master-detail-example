import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomerDto } from '../models/northwind-swagger/customer-dto';
import { CustomerDtoPagedResultDto } from '../models/northwind-swagger/customer-dto-paged-result-dto';
import { OrderWithDetailsDto } from '../models/northwind-swagger/order-with-details-dto';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindSwaggerService {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDtoList(data: any): Observable<CustomerDto[]> {
    if (!data) {
      return of([]);
    }
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto[]>('getCustomerDtoList', [])));
  }

  public getCustomerDtoPagedResultDto(pageIndex: number, size: number, orderBy: string): Observable<CustomerDtoPagedResultDto | undefined> {
    const params = new HttpParams()
      .append('pageIndex', pageIndex)
      .append('size', size)
      .append('orderBy', orderBy);
    const options = {
      params,
    };
    return this.http.get<CustomerDtoPagedResultDto | undefined>(`${API_ENDPOINT}/Customers/GetCustomersWithPage`, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDtoPagedResultDto | undefined>('getCustomerDtoPagedResultDto', undefined)));
  }

  public deleteCustomerDto(id: string): Observable<CustomerDto | undefined> {
    if (!id) {
      return of(undefined);
    }
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.delete<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('deleteCustomerDto', undefined)));
  }

  public postCustomerDto(data: any): Observable<CustomerDto | undefined> {
    if (!data) {
      return of(undefined);
    }
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    const body = data;
    return this.http.post<CustomerDto | undefined>(`${API_ENDPOINT}/Customers`, body, options)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('postCustomerDto', undefined)));
  }

  public getCustomerDto(id: string): Observable<CustomerDto | undefined> {
    if (!id) {
      return of(undefined);
    }
    return this.http.get<CustomerDto | undefined>(`${API_ENDPOINT}/Customers/${id}`)
      .pipe(catchError(ErrorHandlerService.handleError<CustomerDto | undefined>('getCustomerDto', undefined)));
  }

  public getOrderWithDetailsDtoList(id: string): Observable<OrderWithDetailsDto[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get<OrderWithDetailsDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders/WithDetails`)
      .pipe(catchError(ErrorHandlerService.handleError<OrderWithDetailsDto[]>('getOrderWithDetailsDtoList', [])));
  }
}
