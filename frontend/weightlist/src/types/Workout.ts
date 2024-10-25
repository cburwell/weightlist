type Workout = {
  id: string | null,
  name: string;
  description: string;
  exerciseData: Array<ExerciseData>;
  tags: Array<Tag>;
}