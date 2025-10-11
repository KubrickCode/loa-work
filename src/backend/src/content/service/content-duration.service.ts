import { Injectable } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";

@Injectable()
export class ContentDurationService {
  private readonly MAX_DURATION_DAYS = 365;
  private readonly MAX_DURATION_SECONDS = 60 * 60 * 24 * this.MAX_DURATION_DAYS;

  getValidatedTotalSeconds({ minutes, seconds }: { minutes: number; seconds: number }) {
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) {
      throw new Error("총 소요 시간은 0분 0초보다 커야 합니다.");
    }

    if (totalSeconds > this.MAX_DURATION_SECONDS) {
      throw new UserInputError(`최대 시간 제한(${this.MAX_DURATION_DAYS}일)을 초과했습니다.`);
    }

    if (seconds >= 60) {
      throw new UserInputError("초는 60초 미만이어야 합니다.", {
        field: "seconds",
      });
    }

    return totalSeconds;
  }
}
