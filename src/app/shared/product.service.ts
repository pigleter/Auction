import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAllCategories(): string[] {
    return ['电子设备', '硬件设备', '衣服'];
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get('/api/products').map(res => <any>res);
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get('/api/product/' + id).map(res => <any>res);
  }

  getCommmentsForProductId(id: number): Observable<Comment[]> {
    return this.httpClient.get('/api/product/' + id + '/comments').map(res => <any>res);
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.httpClient.get('/api/products', {params: this.encodeParams(params)}).map(res => <any>res);
  }

  private encodeParams(params: ProductSearchParams): HttpParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: HttpParams, key: string) => {
        sum = sum.append(key, params[key]);
        return sum;
      }, new HttpParams());
  }

}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {

  }
}

export class Product {

  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {

  }
}

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
    ) {

  }
}
