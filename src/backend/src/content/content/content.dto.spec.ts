import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ContentListFilter, CreateContentInput, CreateContentItemInput } from "./content.dto";
import { ContentStatus } from "@prisma/client";

describe("ContentListFilter Validation", () => {
  it("유효한 필터 입력을 허용해야 함", async () => {
    const filter = plainToInstance(ContentListFilter, {
      contentCategoryId: 1,
      includeSeeMore: true,
      keyword: "test",
      status: ContentStatus.ACTIVE,
    });

    const errors = await validate(filter);
    expect(errors).toHaveLength(0);
  });

  it("모든 필드가 없어도 허용해야 함 (optional)", async () => {
    const filter = plainToInstance(ContentListFilter, {});

    const errors = await validate(filter);
    expect(errors).toHaveLength(0);
  });

  it("contentCategoryId가 0이어도 허용해야 함", async () => {
    const filter = plainToInstance(ContentListFilter, {
      contentCategoryId: 0,
    });

    const errors = await validate(filter);
    expect(errors).toHaveLength(0);
  });

  it("빈 keyword를 허용해야 함", async () => {
    const filter = plainToInstance(ContentListFilter, {
      keyword: "",
    });

    const errors = await validate(filter);
    expect(errors).toHaveLength(0);
  });

  it("keyword가 100자를 초과하면 에러", async () => {
    const filter = plainToInstance(ContentListFilter, {
      keyword: "a".repeat(101),
    });

    const errors = await validate(filter);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("keyword");
  });

  it("잘못된 status enum을 거부해야 함", async () => {
    const filter = plainToInstance(ContentListFilter, {
      status: "INVALID_STATUS",
    });

    const errors = await validate(filter);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("status");
  });
});

describe("CreateContentInput Validation", () => {
  const validInput = {
    categoryId: 1,
    contentRewards: [
      {
        averageQuantity: 10.5,
        isBound: false,
        itemId: 1,
      },
    ],
    duration: 300,
    level: 1600,
    name: "Test Content",
  };

  it("유효한 입력을 허용해야 함", async () => {
    const input = plainToInstance(CreateContentInput, validInput);

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("categoryId가 0 이하면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      categoryId: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("categoryId");
  });

  it("level이 1 미만이면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      level: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("level");
  });

  it("level이 1700 초과면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      level: 1701,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("level");
  });

  it("level 1과 1700은 유효함 (경계값)", async () => {
    const input1 = plainToInstance(CreateContentInput, {
      ...validInput,
      level: 1,
    });
    const input2 = plainToInstance(CreateContentInput, {
      ...validInput,
      level: 1700,
    });

    const errors1 = await validate(input1);
    const errors2 = await validate(input2);

    expect(errors1).toHaveLength(0);
    expect(errors2).toHaveLength(0);
  });

  it("duration이 0 이하면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      duration: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("duration");
  });

  it("name이 비어있으면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      name: "",
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("name");
  });

  it("name이 100자를 초과하면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      name: "a".repeat(101),
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("name");
  });

  it("contentRewards가 빈 배열이면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      contentRewards: [],
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("contentRewards");
  });

  it("gate가 0 이하면 에러", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      gate: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("gate");
  });

  it("gate가 null이면 허용", async () => {
    const input = plainToInstance(CreateContentInput, {
      ...validInput,
      gate: null,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });
});

describe("CreateContentItemInput Validation", () => {
  it("유효한 입력을 허용해야 함", async () => {
    const input = plainToInstance(CreateContentItemInput, {
      averageQuantity: 10.5,
      isBound: false,
      itemId: 1,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("averageQuantity가 음수면 에러", async () => {
    const input = plainToInstance(CreateContentItemInput, {
      averageQuantity: -1,
      isBound: false,
      itemId: 1,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("averageQuantity");
  });

  it("averageQuantity가 0이면 허용", async () => {
    const input = plainToInstance(CreateContentItemInput, {
      averageQuantity: 0,
      isBound: false,
      itemId: 1,
    });

    const errors = await validate(input);
    expect(errors).toHaveLength(0);
  });

  it("itemId가 0 이하면 에러", async () => {
    const input = plainToInstance(CreateContentItemInput, {
      averageQuantity: 10,
      isBound: false,
      itemId: 0,
    });

    const errors = await validate(input);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe("itemId");
  });
});
