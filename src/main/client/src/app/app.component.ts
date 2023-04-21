import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from "apollo-angular";
import { FormBuilder, FormControl } from "@angular/forms";

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

  COMPLETE_TASK_MUTATION = gql`
    mutation completeTask($id: ID!, $completed: Boolean!) {
      completeTask(id: $id, completed: $completed) {
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

  completeTask(id: number, checked: boolean): any {
    this.apollo.mutate({
      mutation: this.COMPLETE_TASK_MUTATION,
      variables: {
        id: id,
        completed: checked
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
