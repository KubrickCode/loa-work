import { Injectable } from "@nestjs/common";
import * as promClient from "prom-client";

@Injectable()
export class MonitoringService {
  private httpRequestsTotal: promClient.Counter<string>;

  constructor() {
    promClient.collectDefaultMetrics();
    this.httpRequestsTotal = new promClient.Counter({
      help: "Total number of HTTP requests",
      labelNames: ["method", "path", "status"],
      name: "http_requests_total",
    });
  }

  async getMetrics(): Promise<string> {
    return promClient.register.metrics();
  }

  incrementRequest(method: string, path: string, status: string) {
    this.httpRequestsTotal.inc({ method, path, status });
  }
}
