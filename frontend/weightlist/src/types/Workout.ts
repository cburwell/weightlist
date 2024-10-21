type Workout = {
  id: string,
  name: string;
  description: string;
  exerciseData: Record<string, string>[];
  tags: Array<string>;
}