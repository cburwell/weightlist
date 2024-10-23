import { createFileRoute } from '@tanstack/react-router'
import React, {useEffect} from 'react';
import {api} from "../../../static/js/api";
import {CreateExerciseComponent} from "./create-exercise";

export const Route = createFileRoute('/exercises/$exerciseId')({
  component: ViewExerciseComponent,
})

function ViewExerciseComponent() {
  const {exerciseId} = Route.useParams();

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <CreateExerciseComponent eid={exerciseId} edit={false} />
    </React.Fragment>
  );
}
