export interface Note {
  id: number;
  title: string;
  summary: string;
  labels: number[];
  startDate: number; //timestamp
  endDate: number; //timestamp
}
