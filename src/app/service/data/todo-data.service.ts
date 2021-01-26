import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(username: string) {
    //return this.http.get<Todo[]>(`http://localhost:8080/users/${username}/todos`);
    //let url = `${API_URL}/users/${username}/todos`;
    //console.log('url: [' + url + ']')
    return this.http.get<Todo[]>(`${API_URL}/users/${username}/todos`);
    //return this.http.get<Todo[]>(url);
    //console.log("Execute Hello World Bean Service");
  }

  deleteTodo(username: string, id: any) {
    //return this.http.delete(`http://localhost:8080/users/${username}/todos/${id}`)
    return this.http.delete(`${API_URL}/users/${username}/todos/${id}`)
  }

  retrieveTodo(username: string, id: any) {
    return this.http.get<Todo>(`${API_URL}/users/${username}/todos/${id}`)
  }

  updateTodo(username: string, id: number, todo: Todo) {
    return this.http.put(
      //`http://localhost:8080/users/${username}/todos/${id}`, todo
      `${API_URL}/users/${username}/todos/${id}`, todo
      )
  }

  createTodo(username: string, todo: Todo) {
    return this.http.post(
      //`http://localhost:8080/users/${username}/todos`
      `${API_URL}/users/${username}/todos`, todo)
  }
}
