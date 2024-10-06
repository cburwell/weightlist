package com.cburwell.weightlist.repositories;

import com.cburwell.weightlist.models.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
}
