import axios from 'axios';
import { Request } from 'express';
import Checker from './checker';

class Interceptor {
  private static instance: Interceptor;
  constructor() {}

  public static getInstance(): Interceptor {
    if (!this.instance) {
      this.instance = new Interceptor();
    }
    return this.instance;
  }

  public async connectMainServer(req: Request): Promise<Object | null> {
    try {
      console.log('method', req.method);
      console.log('query', req.query);
      console.log('params', req.params);
      console.log('url', req.url);
      console.log('path', req.path);
      console.log('token', req.headers['authorization']?.split(' ')[1]);

      const nextUrl = `${process.env.BASE_URL}:${Checker.getInstance().getStableServerPort()}`;
      console.log(nextUrl,'nextUrl')
      switch (req.method) {
        default:
        case 'GET': {
          const result = await this.GET(`${nextUrl}${req.url}`);
          return result;
        }
        case 'POST': {
          const result = await this.POST(`${nextUrl}${req.url}`, req.body);
          return result;
        }
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async GET(url: string, token: string | null = ''): Promise<Object | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: token ?? ''
        }
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async POST(url: string, body: any, token: string | null = ''): Promise<Object | null> {
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: token ?? ''
        }
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default Interceptor;
