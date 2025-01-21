package com.cburwell.weightlist.models;

import org.springframework.data.annotation.Id;

import java.math.BigInteger;

public class ExerciseData {
    @Id
    private BigInteger id;
    private String eid;
    private String name;
    private String sets;
    private String reps;

    public BigInteger getId() {
        return id;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSets() {
        return sets;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }

    public String getReps() {
        return reps;
    }

    public void setReps(String reps) {
        this.reps = reps;
    }

    @Override
    public String toString() {
        return String.format(
                "ExerciseData [id=%s, eid=%s, name=%s, sets=%s, reps=%s]",
                this.id, this.eid, this.name, this.sets, this.reps
        );
    }
}
