package com.cburwell.weightlist.controllers;

import com.cburwell.weightlist.models.Exercise;
import com.cburwell.weightlist.repositories.ExerciseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExerciseController {
    private final ExerciseRepository repository;

    ExerciseController(ExerciseRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/exercises")
    List<Exercise> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/exercises")
    Exercise newExercise(@RequestBody Exercise newExercise) {
        return repository.save(newExercise);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/exercises/{id}")
    Exercise one(@PathVariable String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Can't find exercise: " + id));
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PutMapping("/exercises/{id}")
    Exercise replaceExercise(@RequestBody Exercise newExercise, @PathVariable String id) {
        return repository.findById(id)
                .map(exercise -> {
                    exercise.setName(newExercise.getName());
                    exercise.setDescription(newExercise.getDescription());
                    exercise.setImageUrl(newExercise.getImageUrl());
                    exercise.setVideoUrl(newExercise.getVideoUrl());
                    exercise.setTags(newExercise.getTags());
                    return repository.save(exercise);
                })
                .orElseGet(() -> {
                    return repository.save(newExercise);
                });
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping("/exercises/{id}")
    void deleteExercise(@PathVariable String id) {
        repository.deleteById(id);
    }
}
