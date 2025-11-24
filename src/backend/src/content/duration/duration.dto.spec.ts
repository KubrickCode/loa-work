import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { EditContentDurationInput } from "./duration.dto";

describe("EditContentDurationInput Validation", () => {
  it("유효한 시간 형식을 허용해야 함", async () => {
    const input = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: 5,
      seconds: 30,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("minutes가 59를 초과하면 에러", async () => {
    const input = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: 60,
      seconds: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("minutes");
  });

  it("seconds가 59를 초과하면 에러", async () => {
    const input = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: 0,
      seconds: 60,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("seconds");
  });

  it("minutes와 seconds가 0-59 범위면 허용 (경계값)", async () => {
    const input1 = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: 0,
      seconds: 0,
    });
    const input2 = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: 59,
      seconds: 59,
    });

    const errors1 = await validate(input1);
    const errors2 = await validate(input2);

    expect(errors1).toHaveLength(0);
    expect(errors2).toHaveLength(0);
  });

  it("minutes가 음수면 에러", async () => {
    const input = plainToInstance(EditContentDurationInput, {
      contentId: 1,
      minutes: -1,
      seconds: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("minutes");
  });

  it("contentId가 0 이하면 에러", async () => {
    const input = plainToInstance(EditContentDurationInput, {
      contentId: 0,
      minutes: 5,
      seconds: 30,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("contentId");
  });
});
