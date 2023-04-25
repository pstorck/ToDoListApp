import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: any = [];
  error: any;
  loading = true;
  description= '';

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  TASKS_QUERY = gql`
    {
      tasks {
        id
        description
        completed
      }
    }
  `

  TOGGLE_COMPLETE_MUTATION = gql`
    mutation toggleComplete($id: ID!) {
      toggleComplete(id: $id) {
          id
          description
          completed
        }
    }
  `

  ADD_TASK_MUTATION = gql`
    mutation createTask($description: String!) {
      createTask(description:$description) {
            id
            description
            completed
      }
    }
  `

  DELETE_TASK_MUTATION = gql`
    mutation deleteTask($id: ID!) {
      deleteTask(id: $id)
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

  toggleComplete(id: number): any {
    this.apollo.mutate({
      mutation: this.TOGGLE_COMPLETE_MUTATION,
      variables: {
        id: id,
      }
    }).subscribe();
  }

  addTodo() {
    if (this.description != '') {
      this.apollo.mutate({
        mutation: this.ADD_TASK_MUTATION,
        refetchQueries: [{
          query: this.TASKS_QUERY
        }],
        variables: {
          description: this.description
        }
      }).subscribe();
      this.description = '';
    }
  }

  deleteTask(id: number) {
    this.apollo.mutate({
      mutation: this.DELETE_TASK_MUTATION,
      refetchQueries: [{
        query: this.TASKS_QUERY
      }],
      variables: {
        id: id
      }
    }).subscribe();
  }
}
