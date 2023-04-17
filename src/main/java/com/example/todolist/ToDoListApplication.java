package com.example.todolist;

import com.example.todolist.entity.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ToDoListApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToDoListApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(TaskRepository taskRepository) {
        return args -> {
            taskRepository.save(new Task("Write to-do list app using Spring Boot and GraphQL", "pstorck", false));
            taskRepository.save(new Task("Become even more epic at programming", "pstorck", false));
            taskRepository.save(new Task("Call my dad", "schaltas", false));
            taskRepository.save(new Task("Call my mom", "schaltas", false));
            taskRepository.save(new Task("Beat Parker at life", "schaltas", false));
            taskRepository.findAll().forEach(System.out::println);
        };
    }
}
