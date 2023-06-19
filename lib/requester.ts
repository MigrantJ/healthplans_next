import { Mutex } from "async-mutex";

const API_KEY = process.env.HEALTHCARE_API_KEY;

class Singleton {
  private static _instance: Singleton;
  private static readonly RATE_LIMIT_PER_SECOND = 200;
  private static readonly RATE_LIMIT_PER_MINUTE = 1000;

  private numRequests = 0;
  private remainingPerSecond = Singleton.RATE_LIMIT_PER_SECOND;
  private remainingPerMinute = Singleton.RATE_LIMIT_PER_MINUTE;
  private mutex = new Mutex();

  private hasToken = async () => {
    const release = await this.mutex.acquire();
    let tokenAvailable: boolean;
    try {
      tokenAvailable =
        this.remainingPerSecond > 10 || this.remainingPerMinute > 50;
    } finally {
      release();
    }
    return tokenAvailable;
  };

  private setRemaining = async (res: Response) => {
    const release = await this.mutex.acquire();
    try {
      this.remainingPerSecond = parseInt(
        res.headers.get("X-RateLimit-Remaining-second")
      );
      this.remainingPerMinute = parseInt(
        res.headers.get("X-RateLimit-Remaining-minute")
      );
      this.numRequests++;
      console.log(`Remaining Per Second: ${this.remainingPerSecond}`);
      console.log(`Remaining Per Minute: ${this.remainingPerMinute}`);
      console.log(`Num Requests: ${this.numRequests}`);
    } finally {
      release();
    }
  };

  private makeRequest = async (url: string, body) => {
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    await this.setRemaining(res);
    return res;
  };

  public searchPlans = async (body): Promise<[Response, number]> => {
    if (!(await this.hasToken())) {
      return [null, 429];
    }
    const url = `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${API_KEY}`;
    const res = await this.makeRequest(url, body);
    return [res, res.status];
  };

  public getEligibility = async (body) => {
    const url = `https://marketplace.api.healthcare.gov/api/v1/households/eligibility/estimates?apikey=${API_KEY}`;
    const res = await this.makeRequest(url, body);
    return res;
  };

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance;
  }
}

const instance = Singleton.instance;

export default instance;
