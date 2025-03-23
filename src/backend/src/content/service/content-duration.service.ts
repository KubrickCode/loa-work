import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';

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

    if (totalSeconds <= 0) {
      throw new Error('총 소요 시간은 0분 0초보다 커야 합니다.');
    }

    if (seconds >= 60) {
      throw new UserInputError('초는 60초 미만이어야 합니다.', {
        field: 'seconds',
      });
    }

    return totalSeconds;
  }
}
