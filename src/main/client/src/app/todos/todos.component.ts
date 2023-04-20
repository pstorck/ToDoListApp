import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any = [];
  error: any;
  loading = true;

  constructor(private apollo: Apollo) {}

  TASKS_QUERY = gql`
    {
      tasks {
        description
        author
        completed
      }
    }
  `

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: this.TASKS_QUERY,
    }).valueChanges.subscribe(({ loading, error, data}: any) => {
      this.todos = data.tasks;
      this.error = error;
      this.loading = loading;
    });
  }
}
