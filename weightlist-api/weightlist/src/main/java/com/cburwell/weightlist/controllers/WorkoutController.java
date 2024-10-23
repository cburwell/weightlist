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
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/workouts")
    List<Workout> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/workouts")
    Workout newWorkout(@RequestBody Workout newWorkout) {
        return repository.save(newWorkout);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/workouts/{id}")
    Workout one(@PathVariable String id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Can't find workout: " + id));
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PutMapping("/workouts/{id}")
    Workout replaceWorkout(@RequestBody Workout newWorkout, @PathVariable String id) {
        return repository.findById(id)
                .map(workout -> {
                    workout.setName(newWorkout.getName());
                    workout.setDescription(newWorkout.getDescription());
                    workout.setExerciseIds(newWorkout.getExerciseIds());
                    workout.setTags(newWorkout.getTags());
                    return repository.save(workout);
                })
                .orElseGet(() -> {
                    return repository.save(newWorkout);
                });
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping("/workouts/{id}")
    void deleteWorkout(@PathVariable String id) {
        repository.deleteById(id);
    }
}
