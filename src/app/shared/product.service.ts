import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams, Headers} from '@angular/http';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) {
  }

  getAllCategories(): string[] {
    return ['电子设备', '硬件设备', '衣服'];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('http://localhost:8000/api/products', {headers: this.getHeaders()}).map(res => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('http://localhost:8000/api/product/' + id).map(res => res.json());
  }

  getCommmentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get('http://localhost:8000/api/product/' + id + '/comments').map(res => res.json());
  }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('http://localhost:8000/api/products', {search: this.encodeParams(params)}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams): URLSearchParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
      sum.append(key, params[key]);
      return sum;
      }, new URLSearchParams());
  }

  private getHeaders(): Headers {
    let hd: Headers = new Headers({'Access-Control-Allow-Origin': '*'});
    return hd;
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
