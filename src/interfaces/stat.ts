export interface IStat {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  user_id: number;
  date: string;
  duration_min: number;
  feeling_calm: number;
  feeling_focus: number;
  feeling_relax: number;
  feeling_anxiety: number;
}
