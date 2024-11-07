package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("roles")
public class Role {
    @Id
    private int id;

    private ERole name;

    public Role() {

    }

    public Role(ERole name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}
