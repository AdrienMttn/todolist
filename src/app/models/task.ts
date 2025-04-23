export class task {
  id!: number;
  description!: string;
  date!: Date;
  important!: boolean;
  check!: boolean;

  constructor(
    descrption: string,
    date: Date,
    id: number,
    check: boolean,
    important: boolean
  ) {
    this.id = id;
    this.description = descrption;
    this.date = date;
    this.check = check;
    this.important = important;
  }
}
