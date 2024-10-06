package com.cburwell.weightlist.repositories;

import com.cburwell.weightlist.models.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
