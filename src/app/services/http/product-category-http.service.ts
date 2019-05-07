import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {

  private baseAPI = `http://localhost:8000/api`;
  constructor(private http: HttpClient) { }

  list(productId: number): Observable<ProductCategory> {
    const token = window.localStorage.getItem('token');
    return this.http.get < {data: ProductCategory} > (this.getBaseUrl(productId), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  create(productId: number, categoriesId: number[]): Observable<ProductCategory> {
    const token = window.localStorage.getItem('token');
    // tslint:disable-next-line: max-line-length
    return this.http.post < {data: ProductCategory} > (this.getBaseUrl(productId), {'categories': categoriesId}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map(response => response.data)
    );
  }

  private getBaseUrl(productId: number, categoryId: number = null): string {
    let baseUrl = `${this.baseAPI}/products/${productId}/categories`;
    if (categoryId) {
      baseUrl += `/${categoryId}`;
    }
    return baseUrl;
  }

  destroy(productId: number, categoryId: number): Observable<any> {
    const token = window.localStorage.getItem('token');
    return this.http.delete < {data: ProductCategory} > (this.getBaseUrl(productId, categoryId), {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
