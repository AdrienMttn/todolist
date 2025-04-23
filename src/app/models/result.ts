export class result {
  status!: string;
  message!: string;

  constructor(message: string, status: string) {
    this.status = status;
    this.message = message;
  }
}
