package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigInteger;

@Document("tags")
public class Tag {
    @Id
    private BigInteger id;
    private String name;

    public Tag() {
        this.name = "";
    }

    public BigInteger getId() {
        return id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format(
                "Tag [id=%s, name=%s]",
                this.id, this.name
        );
    }
}
