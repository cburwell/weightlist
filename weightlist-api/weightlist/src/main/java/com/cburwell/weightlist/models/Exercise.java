package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("exercises")
public class Exercise {
    @Id
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private String category;

    public Exercise() {
        this.name = "New Exercise";
        this.description = "";
        this.imageUrl = "";
        this.videoUrl = "";
        this.category = "";
    }

    public String getId() {
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return String.format(
                "Exercise [id=%s, name=%s, description=%s, imageUrl=%s, videoUrl=%s, category=%s]",
                this.id, this.name, this.description, this.imageUrl, this.videoUrl, this.category
        );
    }
}
