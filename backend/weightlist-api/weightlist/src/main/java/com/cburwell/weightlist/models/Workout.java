package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;
import java.util.ArrayList;

@Document("workouts")
public class Workout {
    
    @Id
    private BigInteger id;
    private String name;
    private String description;
    private ArrayList<ExerciseData> exerciseData;
    private ArrayList<Tag> tags;

    public Workout() {
        this.name = "New Workout";
        this.description = "";
        this.exerciseData = new ArrayList<ExerciseData>();
        this.tags = new ArrayList<Tag>();
    }

    public BigInteger getId() {
        return id;
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

    public ArrayList<ExerciseData> getExerciseData() {
        return exerciseData;
    }

    public void setExerciseData(ArrayList<ExerciseData> exerciseData) {
        this.exerciseData = exerciseData;
    }

    public void addExerciseData(ExerciseData exerciseData) {
        this.exerciseData.add(exerciseData);
    }

    public void removeExerciseData(ExerciseData exerciseData) {
        this.exerciseData.remove(exerciseData);
    }

    public ArrayList<Tag> getTags() {
        return tags;
    }

    public void setTags(ArrayList<Tag> tags) {
        this.tags = tags;
    }

    public void addTag(Tag tag) {
        this.tags.add(tag);
    }

    public void removeTag(Tag tag) {
        this.tags.remove(tag);
    }

    @Override
    public String toString() {
        return String.format(
                "Workout [id=%s, name=%s, description=%s, exerciseData=%s, tags=%s]",
                this.id, this.name, this.description, this.exerciseData.toString(), this.tags.toString()
        );
    }
}
