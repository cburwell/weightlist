package com.cburwell.weightlist.repositories;

import com.cburwell.weightlist.models.ERole;
import com.cburwell.weightlist.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
