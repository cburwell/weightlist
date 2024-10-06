package com.cburwell.weightlist.controllers;

import java.util.List;

import com.cburwell.weightlist.models.Workout;
import com.cburwell.weightlist.repositories.WorkoutRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class WorkoutController {
    private final WorkoutRepository repository;

    WorkoutController(WorkoutRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/workouts")
    List<Workout> all() {
        System.out.println("In workouts");
        System.out.println(repository.findAll());
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @PostMapping("/workouts")
    Workout newWorkout(@RequestBody Workout newWorkout) {
        return repository.save(newWorkout);
    }

    @GetMapping("/workouts/{id}")
    Workout one(@PathVariable Long id) {
        return repository.findById(id.toString())
                .orElseThrow(() -> new RuntimeException("Can't find workout: " + id));
    }

    @PutMapping("/workouts/{id}")
    Workout replaceWorkout(@RequestBody Workout newWorkout, @PathVariable Long id) {
        return repository.findById(id.toString())
                .map(workout -> {
                    workout.setName(newWorkout.getName());
                    workout.setDescription(newWorkout.getDescription());
                    workout.setExercises(newWorkout.getExercises());
                    workout.setTags(newWorkout.getTags());
                    return repository.save(workout);
                })
                .orElseGet(() -> {
                    return repository.save(newWorkout);
                });
    }

    @DeleteMapping("/workouts/{id}")
    void deleteWorkout(@PathVariable Long id) {
        repository.deleteById(id.toString());
    }
}
