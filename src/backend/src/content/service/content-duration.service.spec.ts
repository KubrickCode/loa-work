import { Test, TestingModule } from '@nestjs/testing';
import { ContentDurationService } from './content-duration.service';
import { UserInputError } from 'apollo-server-express';

describe('ContentDurationService', () => {
  let service: ContentDurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentDurationService],
    }).compile();

    service = module.get<ContentDurationService>(ContentDurationService);
  });

  describe('getValidatedTotalSeconds', () => {
    it('분→초 변환 정확성 (1분 = 60초)', () => {
      const result = service.getValidatedTotalSeconds({
        minutes: 1,
        seconds: 0,
      });

      expect(result).toBe(60);
    });

    it('분과 초 조합 계산 정확성', () => {
      const result = service.getValidatedTotalSeconds({
        minutes: 5,
        seconds: 30,
      });

      expect(result).toBe(330); // 5 * 60 + 30 = 330
    });

    it('경계값 처리 (0분)', () => {
      const result = service.getValidatedTotalSeconds({
        minutes: 0,
        seconds: 1,
      });

      expect(result).toBe(1);
    });

    it('경계값 처리 (최대값)', () => {
      const maxDays = 365;
      const maxSeconds = 60 * 60 * 24 * maxDays;
      const maxMinutes = Math.floor(maxSeconds / 60);

      const result = service.getValidatedTotalSeconds({
        minutes: maxMinutes,
        seconds: 0,
      });

      expect(result).toBe(maxSeconds);
    });

    it('에러 케이스: 60초 이상 입력', () => {
      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: 1,
          seconds: 60,
        });
      }).toThrow(UserInputError);

      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: 1,
          seconds: 65,
        });
      }).toThrow('초는 60초 미만이어야 합니다.');
    });

    it('에러 케이스: 음수 입력', () => {
      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: -1,
          seconds: 0,
        });
      }).toThrow('총 소요 시간은 0분 0초보다 커야 합니다.');

      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: 0,
          seconds: -1,
        });
      }).toThrow('총 소요 시간은 0분 0초보다 커야 합니다.');
    });

    it('에러 케이스: 0분 0초 입력', () => {
      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: 0,
          seconds: 0,
        });
      }).toThrow('총 소요 시간은 0분 0초보다 커야 합니다.');
    });

    it('에러 케이스: 비정상적으로 큰 값 (365일 초과)', () => {
      const maxDays = 365;
      const exceedSeconds = 60 * 60 * 24 * maxDays + 1;
      const exceedMinutes = Math.floor(exceedSeconds / 60);

      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: exceedMinutes,
          seconds: 1,
        });
      }).toThrow(UserInputError);

      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: exceedMinutes,
          seconds: 1,
        });
      }).toThrow(`최대 시간 제한(${maxDays}일)을 초과했습니다.`);
    });

    it('소수점 포함 시간 처리', () => {
      const result = service.getValidatedTotalSeconds({
        minutes: 1.5,
        seconds: 30.7,
      });

      // JavaScript에서 1.5 * 60 + 30.7 = 120.7
      expect(result).toBe(120.7);
    });

    it('null/undefined 입력 시 처리', () => {
      // null은 JavaScript에서 0으로 변환되므로, totalSeconds가 0이 되어 에러 발생
      expect(() => {
        service.getValidatedTotalSeconds({
          minutes: null as any,
          seconds: 0,
        });
      }).toThrow('총 소요 시간은 0분 0초보다 커야 합니다.');

      // 0 * 60 + undefined = NaN
      // NaN <= 0은 false이므로 첫 번째 조건을 통과
      // undefined >= 60은 false이므로 두 번째 조건도 통과
      // 결과적으로 NaN이 반환됨
      const result1 = service.getValidatedTotalSeconds({
        minutes: 0,
        seconds: undefined as any,
      });
      expect(result1).toBeNaN();

      // undefined * 60 + undefined = NaN
      // 마찬가지로 NaN이 반환됨
      const result2 = service.getValidatedTotalSeconds({
        minutes: undefined as any,
        seconds: undefined as any,
      });
      expect(result2).toBeNaN();
    });
  });
});