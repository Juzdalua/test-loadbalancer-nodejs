class MainServer {
  private id: number;
  private amount: number = 0;
  private PORT: number = 0;
  private SERVER_URL: string = '';
  private healthCheckQueue: number[] = [];
  private healthCheckLimitLength: number = 5;

  constructor(_id:number, _PORT: number) {
    this.id = _id;
    this.PORT = _PORT;
    this.SERVER_URL = `${process.env.BASE_URL}:${this.PORT}`;
  }

  public getServerId(): number{
    return this.id;
  }

  public getAmount(): number{
    return this.amount;
  }

  public getServerUrl(): string {
    return this.SERVER_URL;
  }

  public pushResponseTime(ms: number): void {
    if (this.healthCheckQueue.length > this.healthCheckLimitLength) {
      this.healthCheckQueue.shift();
    }
    this.healthCheckQueue.push(ms);
  }

  public popResponseTime(): void {
    if (this.healthCheckQueue.length > 0) {
      this.healthCheckQueue.shift();
    }
  }

  public getAvgResponseTime(): number {
    if (this.healthCheckQueue.length == 0) {
      return -1;
    } else {
      let sum = 0;
      for (let i = 0; i < this.healthCheckQueue.length; i++) {
        sum += this.healthCheckQueue[i];
      }
      return sum / this.healthCheckQueue.length;
    }
  }
}

export default MainServer;
