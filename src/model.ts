export interface Todo {
  id: string;
  name: string;
  date?: string;
}

export interface Status {
  title: string;
  items: Todo[];
}

export interface State {
  [key: string]: Status;
}
