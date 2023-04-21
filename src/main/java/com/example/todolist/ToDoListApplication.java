package com.example.todolist;

import com.example.todolist.entity.Task;
import com.example.todolist.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ToDoListApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToDoListApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/graphql").allowedOrigins("http://localhost:4200");
            }
        };
    }

    @Bean
    public CommandLineRunner init(TaskRepository taskRepository) {
        return args -> {
            taskRepository.save(new Task("Write to-do list app using Spring Boot and GraphQL", true));
            taskRepository.save(new Task("Become even more epic at programming", false));
            taskRepository.save(new Task("Call my dad",  true));
            taskRepository.save(new Task("Call my mom", false));
            taskRepository.save(new Task("Beat Parker at life", false));
            taskRepository.findAll().forEach(System.out::println);
        };
    }
}
