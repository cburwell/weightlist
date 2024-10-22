package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("exercises")
public class Exercise {
    @Id
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String videoUrl;
    private ArrayList<Tag> tags;

    public Exercise() {
        this.name = "New Exercise";
        this.description = "";
        this.imageUrl = "";
        this.videoUrl = "";
        this.tags = new ArrayList<Tag>();
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

    public ArrayList<Tag> getTags() {
        return tags;
    }

    public void setTags(ArrayList<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return String.format(
                "Exercise [id=%s, name=%s, description=%s, imageUrl=%s, videoUrl=%s, tags=%s]",
                this.id, this.name, this.description, this.imageUrl, this.videoUrl, this.tags.toString()
        );
    }
}
