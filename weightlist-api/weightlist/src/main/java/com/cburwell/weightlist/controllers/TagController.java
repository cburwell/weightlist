package com.cburwell.weightlist.controllers;

import com.cburwell.weightlist.models.Tag;
import com.cburwell.weightlist.repositories.TagRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TagController {
    private final TagRepository repository;

    TagController(TagRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/tags")
    List<Tag> all() {
        System.out.println(repository.findAll());
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @CrossOrigin(origins = "http://localhost:3001")
    @PostMapping("/tags")
    Tag newTag(@RequestBody Tag newTag) {
        return repository.save(newTag);
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @GetMapping("/tags/{id}")
    Tag one(@PathVariable Long id) {
        return repository.findById(id.toString())
                .orElseThrow(() -> new RuntimeException("Can't find tag: " + id));
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @PutMapping("/tags/{id}")
    Tag replaceTag(@RequestBody Tag newTag, @PathVariable Long id) {
        return repository.findById(id.toString())
                .map(tag -> {
                    tag.setName(newTag.getName());
                    return repository.save(tag);
                })
                .orElseGet(() -> {
                    return repository.save(newTag);
                });
    }

    @CrossOrigin(origins = "http://localhost:3001")
    @DeleteMapping("/tags/{id}")
    void deleteTag(@PathVariable Long id) {
        repository.deleteById(id.toString());
    }
}
