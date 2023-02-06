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
  
  getTaskById(id: number) {
    console.log(id)
    return this.http.get(`http://localhost:3000/tasks/${id}`);
  }

  deleteTask(id: number) {
    console.log(id)
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }

  createTask(name: string) {
    return this.http.post('http://localhost:3000/tasks', {Nome: name, Feita: false});
  }

  updateTask(id: number, name: string) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, {Nome: name});
  }

  finishTask(id: number) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, {Feita: true});
  }
}
