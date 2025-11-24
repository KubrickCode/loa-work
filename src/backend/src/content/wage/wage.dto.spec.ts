import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CalculateCustomContentWageInput } from "./wage.dto";

describe("CalculateCustomContentWageInput Validation", () => {
  const validInput = {
    items: [
      {
        id: 1,
        quantity: 10.5,
      },
    ],
    minutes: 5,
    seconds: 30,
  };

  it("유효한 입력을 허용해야 함", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, validInput);

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("minutes가 59를 초과하면 에러", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, {
      ...validInput,
      minutes: 60,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("minutes");
  });

  it("seconds가 59를 초과하면 에러", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, {
      ...validInput,
      seconds: 60,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("seconds");
  });

  it("items가 빈 배열이면 에러", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, {
      ...validInput,
      items: [],
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("items");
  });

  it("중첩된 item 검증이 작동해야 함 (itemId < 1)", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, {
      ...validInput,
      items: [
        {
          id: 0,
          quantity: 10,
        },
      ],
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("중첩된 item 검증이 작동해야 함 (quantity < 0)", async () => {
    const input = plainToInstance(CalculateCustomContentWageInput, {
      ...validInput,
      items: [
        {
          id: 1,
          quantity: -1,
        },
      ],
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
  });
});
