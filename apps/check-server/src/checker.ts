import axios from 'axios';

enum MainServerNum {
  server1 = 1,
  server2 = 2
}

class Checker {
  private static instance: Checker | undefined;
  private stableServer = MainServerNum.server1;

  constructor() {}

  public static getInstance(): Checker {
    if (!this.instance) {
      this.instance = new Checker();
    }
    return this.instance;
  }

  public getStabeServerNum(): MainServerNum {
    return this.stableServer;
  }

  public async healthCheck(): Promise<void> {
    try {
      const [server1Response, server2Response] = await Promise.all([
        axios.get(`${process.env.BASE_URL}:${process.env.SERVER1_PORT}/health`),
        axios.get(`${process.env.BASE_URL}:${process.env.SERVER2_PORT}/health`)
      ]);

      this.stableServer = Math.min(server1Response.data, server2Response.data);
    } catch (error) {
      console.log(`Health Check Error: ${error}`);
    }
  }
}

export default Checker;