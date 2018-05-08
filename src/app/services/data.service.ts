import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IBook } from '../IBook';

@Injectable()
export class DataService {
  private _booksUrl: string = 'http://waelsbookservice.azurewebsites.net/books';
  constructor(private _http: Http) { }

  getBooks(): Observable<IBook[]> {
    // const localBooks = localStorage.getItem('books');
    // if (localBooks) {
    //   return Observable.create(observer => {
    //     observer.next(JSON.parse(localBooks));
    //   });
    // }
    return this._http.get(this._booksUrl + '/GetBooks')
      .pipe(
        map((response: Response) => {
          let data: IBook[] = <IBook[]>response.json();
          // localStorage.setItem('books', JSON.stringify(data));
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getBook(id: number): Observable<IBook> {
    return this.getBooks()
      .pipe(
        map((books: IBook[]) => books.find(b => b.id === id)),
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addBook(book: IBook): Observable<Response> {
    // const local:string = localStorage.getItem('books');
    // if (!local) return Observable.throw('Local storage not found.');
    // let localBooks:IBook[] = JSON.parse(local);
    // localBooks.push(book);
    // localStorage.setItem('books', JSON.stringify(localBooks));
    // return Observable.create(observer => {
    //   observer.next(localBooks);
    // });
    return this._http.post(this._booksUrl + '/AddBook', book)
      .pipe(catchError(this.handleError));
  }


  updateBook(book: IBook): Observable<Response> {
    // const local: string = localStorage.getItem('books');
    // if (!local) {
    //   return Observable.throw('Local storage not found.');
    // }
    // let localBooks: IBook[] = JSON.parse(local);
    // localBooks = localBooks.map(b => {
    //   if (b.id === book.id) {
    //     return Object.assign(b, book);
    //   }
    //   return b;
    // });
    // localStorage.setItem('books', JSON.stringify(localBooks));
    // return Observable.create(observer => observer.next(localBooks));
    return this._http.put(this._booksUrl + '/ModifyBook', book)
      .pipe(catchError(this.handleError));
  }

  getPreviousBookId(id: number): Observable<number> {
    return this.getBooks()
      .pipe(
        map(
          (books: IBook[]) => {
            return books[Math.max(0, books.findIndex(b => b.id === id) - 1)].id;
          }
        ),
        catchError(this.handleError)
      );
  }

  getNextBookId(id: number): Observable<number> {
    return this.getBooks()
      .pipe(
        map(
          (books: IBook[]) => {
            return books[Math.min(books.length - 1, books.findIndex(b => b.id === id) + 1)].id;
          }
        ),
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): any {
    return this._http.delete(`${this._booksUrl + '/DeleteBook'}/${id}`)
      .pipe(
        map((response: Response) => {
          let data: void = <void>response.json();
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getNextId(): Observable<number> {
    return this._http.get(this._booksUrl + '/GetNextId')
      .pipe(
        map((response: Response) => {
          let data: number = <number>response.json();
          return data;
        }),
        catchError(this.handleError)
      );
  }


  canActivate(id): Observable<boolean> {
    return this._http.get(`${this._booksUrl + '/CanActivate'}/${id}`)
      .pipe(
        map(
          (response: Response) => {
            const canActivate: boolean = <boolean>response.json();
            return canActivate;
      
          }
        ),
        catchError(this.handleError)
      );
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
