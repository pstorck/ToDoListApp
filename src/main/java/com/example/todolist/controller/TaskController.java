package com.example.todolist.controller;

import com.example.todolist.entity.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class TaskController {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @QueryMapping
    public List<Task> tasks() throws InterruptedException {
        return (List<Task>) taskRepository.findAll();
    }

    @QueryMapping
    public Task task(@Argument int id) {
        return taskRepository.findById(id).orElse(null);
    }

    @MutationMapping
    public Task toggleComplete(@Argument int id) {
        Task task = taskRepository.findById(id).orElse(null);
        if (task == null) return null;
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    @MutationMapping
    public Task createTask(@Argument String description) {
        Task task = new Task(description, false);
        return taskRepository.save(task);
    }

    @MutationMapping
    public int deleteTask(@Argument int id) {
        taskRepository.deleteById(id);
        return id;
    }
}
