import { Injectable } from "@nestjs/common";
import { Command, Console } from "nestjs-console";
import { SeedService } from "./seed.service";

@Console()
@Injectable()
export class ConsoleService {
  constructor(private seedService: SeedService) {}

  @Command({
    command: "seed",
    description: "Seed 데이터 추가",
  })
  async seed() {
    try {
      console.log("Seeding database...");
      await this.seedService.all();
    } catch (error) {
      console.error(error);
    }
  }
}
