import axios, { AxiosResponse } from 'axios';
import MainServer from './server';

class Checker {
  private static instance: Checker | undefined;
  private connectedServers: MainServer[] = [];
  private serverPorts = [process.env.PORT_SERVER1, process.env.PORT_SERVER2];
  private stableServerId = 1;
  private STABLE_RESPONSE_TIME = 100;

  constructor() {
    for (let i = 0; i < this.serverPorts.length; i++) {
      const mainServer = new MainServer(i + 1, Number(this.serverPorts[i]));
      this.connectedServers.push(mainServer);
    }
  }

  public static getInstance(): Checker {
    if (!this.instance) {
      this.instance = new Checker();
    }
    return this.instance;
  }

  public getStableServer(): number {
    return this.stableServerId;
  }

  public async healthCheck(): Promise<void> {
    try {
      const promiseMap = this.connectedServers.map(async (s) => {
        const startTime = Date.now();
        const response = await axios.get(`${s.getServerUrl()}/health`);

        if (response.status == 200) {
          const responseTime = Date.now() - startTime;
          return {
            server: s,
            responseTime
          };
        } else {
          return {
            server: s,
            responseTime: -1
          };
        }
      });
      const resMap: { server: MainServer; responseTime: number }[] = await Promise.all(promiseMap);

      for (let i = 0; i < this.connectedServers.length; i++) {
        const findServer = resMap.find((v) => v.server == this.connectedServers[i]);
        if (!findServer) continue;
        if (findServer.responseTime == -1) continue;

        const server: MainServer | undefined = findServer.server;
        if (!server) continue;
        server.pushResponseTime(findServer.responseTime);

        let stableServers = this.connectedServers;
        stableServers = stableServers.filter((s) => s.getAvgResponseTime() <= this.STABLE_RESPONSE_TIME);
        stableServers = stableServers.filter((s) => s.getServerId() != this.stableServerId);
        stableServers.sort((a: MainServer, b: MainServer) => {
          return a.getAmount() - b.getAmount();
        });
        this.stableServerId = stableServers[0].getServerId();
      }
    } catch (error) {
      console.log(`Health Check Error: ${error}`);
    }
  }
}

export default Checker;
