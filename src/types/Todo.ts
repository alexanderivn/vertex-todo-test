export interface Todo {
  id: number;
  title: string;
  due_date: string | number | Date;
  is_completed: boolean;
  completed_at: string | number | Date;
  is_editing: boolean;
  created_at: string | number | Date;
}