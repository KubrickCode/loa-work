import { Injectable } from "@nestjs/common";
import * as promClient from "prom-client";

@Injectable()
export class MonitoringService {
  private httpRequestsTotal: promClient.Counter<string>;

  constructor() {
    promClient.collectDefaultMetrics();
    this.httpRequestsTotal = new promClient.Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "path", "status"],
    });
  }

  incrementRequest(method: string, path: string, status: string) {
    this.httpRequestsTotal.inc({ method, path, status });
  }

  async getMetrics(): Promise<string> {
    return promClient.register.metrics();
  }
}
