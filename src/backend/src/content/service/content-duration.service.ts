import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentDurationService {
  getValidatedTotalSeconds({
    minutes,
    seconds,
  }: {
    minutes: number;
    seconds: number;
  }) {
    const totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0 || seconds >= 60) {
      throw new Error('유효하지 않은 시간 형식입니다.');
    }

    return totalSeconds;
  }
}
