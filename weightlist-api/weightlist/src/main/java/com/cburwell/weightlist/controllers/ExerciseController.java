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
    @GetMapping("/exercises")
    List<Exercise> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @PostMapping("/exercises")
    Exercise newExercise(@RequestBody Exercise newExercise) {
        return repository.save(newExercise);
    }

    @GetMapping("/exercises/{id}")
    Exercise one(@PathVariable Long id) {
        return repository.findById(id.toString())
                .orElseThrow(() -> new RuntimeException("Can't find exercise: " + id));
    }

    @PutMapping("/exercises/{id}")
    Exercise replaceExercise(@RequestBody Exercise newExercise, @PathVariable Long id) {
        return repository.findById(id.toString())
                .map(exercise -> {
                    exercise.setName(newExercise.getName());
                    exercise.setDescription(newExercise.getDescription());
                    exercise.setImageUrl(newExercise.getImageUrl());
                    exercise.setVideoUrl(newExercise.getVideoUrl());
                    exercise.setCategory(newExercise.getCategory());
                    return repository.save(exercise);
                })
                .orElseGet(() -> {
                    return repository.save(newExercise);
                });
    }

    @DeleteMapping("/exercises/{id}")
    void deleteExercise(@PathVariable Long id) {
        repository.deleteById(id.toString());
    }
}
