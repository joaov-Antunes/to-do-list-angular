import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks');
  };
  
  getTaskById(id: number) {
    console.log(id)
    return this.http.get(`http://localhost:3000/tasks/${id}`);
  };

  deleteTask(id: number) {
    console.log(id)
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  };

  createTask(name: string, formatedDate: string) {
    return this.http.post('http://localhost:3000/tasks', {Nome: name, Feita: false, DataFinal: formatedDate});
  };

  updateTask(id: number, name: string, urgency: string, date: string) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, {Nome: name, Urgencia: urgency, DataFinal: date});
  };

  finishTask(id: number, done: string) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, {Feita: done});
  };

  setStatus(id: number, done: boolean) {
    return this.http.put(`http://localhost:3000/tasks/${id}`, {StatusTarefa: done});
  };

  getDone() {
    return this.http.get('http://localhost:3000/finish');
  }

  searchTask(name: string) {
    console.log(name);
    return this.http.post(`http://localhost:3000/tasks/search`, {Nome: name});
  };

  getTaskByName(name: string) {
    return this.http.get(`http://localhost:3000/tasks/search/${name}`);
  };

  getUrgency() {
    return this.http.get((`http://localhost:3000/urgency`));
  };
}
