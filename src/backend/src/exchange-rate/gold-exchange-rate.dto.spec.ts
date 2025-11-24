import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { EditGoldExchangeRateInput } from "./gold-exchange-rate.dto";

describe("EditGoldExchangeRateInput Validation", () => {
  it("유효한 환율을 허용해야 함", async () => {
    const input = plainToInstance(EditGoldExchangeRateInput, {
      krwAmount: 500,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("krwAmount가 1 미만이면 에러", async () => {
    const input = plainToInstance(EditGoldExchangeRateInput, {
      krwAmount: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("krwAmount");
  });

  it("krwAmount가 음수면 에러", async () => {
    const input = plainToInstance(EditGoldExchangeRateInput, {
      krwAmount: -1,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("krwAmount");
  });

  it("krwAmount가 1이면 허용 (경계값)", async () => {
    const input = plainToInstance(EditGoldExchangeRateInput, {
      krwAmount: 1,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });
});
