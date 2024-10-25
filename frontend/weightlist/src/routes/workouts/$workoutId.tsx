import { createFileRoute } from '@tanstack/react-router'
import React, {useEffect} from "react";
import {CreateExerciseComponent} from "../exercises/create-exercise";
import {CreateWorkoutComponent} from "./create-workout";

export const Route = createFileRoute('/workouts/$workoutId')({
  component: ViewWorkoutComponent
})

function ViewWorkoutComponent() {
  const {workoutId} = Route.useParams();

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <CreateWorkoutComponent wid={workoutId} edit={false} />
    </React.Fragment>
  );
}