package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("workouts")
public class Workout {
    @Id
    private String id;
    private String name;
    private String description;
    private ArrayList<String> exerciseIds;
    private ArrayList<String> tags;

    public Workout() {
        this.name = "New Workout";
        this.description = "";
        this.exerciseIds = new ArrayList<String>();
        this.tags = new ArrayList<String>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ArrayList<String> getExercises() {
        return exerciseIds;
    }

    public void setExercises(ArrayList<String> exerciseIds) {
        this.exerciseIds = exerciseIds;
    }

    public void addExercise(String exerciseId) {
        this.exerciseIds.add(exerciseId);
    }

    public void removeExercise(String exerciseId) {
        this.exerciseIds.remove(exerciseId);
    }


    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public void addTag(String tag) {
        this.tags.add(tag);
    }

    public void removeTag(String tag) {
        this.tags.remove(tag);
    }

    @Override
    public String toString() {
        return String.format(
                "Workout [id=%s, name=%s, description=%s, exerciseIds=%s, tags=%s]",
                this.id, this.name, this.description, this.exerciseIds.toString(), this.tags.toString()
        );
    }
}
