package com.cburwell.weightlist.repositories;

import com.cburwell.weightlist.models.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepository extends MongoRepository<Tag, String> {
}
