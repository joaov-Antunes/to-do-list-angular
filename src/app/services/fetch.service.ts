import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }

  deleteTask(id: number) {
    console.log(id)
    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  }
}
