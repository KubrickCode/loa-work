import { createManyLoader, createUniqueLoader } from "./data-loader.utils";

describe("createUniqueLoader", () => {
  it("존재하는 엔티티 로드 시 정상 반환", async () => {
    const mockData = [
      { id: 1, name: "Item1" },
      { id: 2, name: "Item2" },
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createUniqueLoader(batchFn, "Item");
    const result = await loader.findUniqueOrThrowById(1);

    expect(result).toEqual({ id: 1, name: "Item1" });
  });

  it("존재하지 않는 ID 로드 시 에러 throw", async () => {
    const batchFn = jest.fn().mockResolvedValue([]);

    const loader = createUniqueLoader(batchFn, "Item");

    await expect(loader.findUniqueOrThrowById(999)).rejects.toThrow("Item with id 999 not found");
  });

  it("여러 ID 동시 요청 시 배칭 동작", async () => {
    const mockData = [
      { id: 1, name: "Item1" },
      { id: 2, name: "Item2" },
      { id: 3, name: "Item3" },
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createUniqueLoader(batchFn, "Item");

    const [result1, result2, result3] = await Promise.all([
      loader.findUniqueOrThrowById(1),
      loader.findUniqueOrThrowById(2),
      loader.findUniqueOrThrowById(3),
    ]);

    expect(batchFn).toHaveBeenCalledTimes(1);
    expect(batchFn).toHaveBeenCalledWith([1, 2, 3]);
    expect(result1).toEqual({ id: 1, name: "Item1" });
    expect(result2).toEqual({ id: 2, name: "Item2" });
    expect(result3).toEqual({ id: 3, name: "Item3" });
  });
});

describe("createManyLoader", () => {
  it("정상적으로 다중 엔티티 로드", async () => {
    const mockData = [
      { contentId: 1, item: { name: "골드" } },
      { contentId: 1, item: { name: "실링" } },
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createManyLoader(batchFn);
    const result = await loader.findManyByContentId(1);

    expect(result).toHaveLength(2);
  });

  it("ItemSortOrder에 따른 정렬", async () => {
    const mockData = [
      { contentId: 1, item: { name: "실링" } }, // order: 10
      { contentId: 1, item: { name: "골드" } }, // order: 1
      { contentId: 1, item: { name: "운명의 파편" } }, // order: 3
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createManyLoader(batchFn);
    const result = await loader.findManyByContentId(1);

    expect(result[0].item.name).toBe("골드");
    expect(result[1].item.name).toBe("운명의 파편");
    expect(result[2].item.name).toBe("실링");
  });

  it("존재하지 않는 contentId에 대해 빈 배열 반환", async () => {
    const batchFn = jest.fn().mockResolvedValue([]);

    const loader = createManyLoader(batchFn);
    const result = await loader.findManyByContentId(999);

    expect(result).toEqual([]);
  });

  it("여러 contentId 동시 요청 시 배칭 동작", async () => {
    const mockData = [
      { contentId: 1, item: { name: "골드" } },
      { contentId: 2, item: { name: "실링" } },
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createManyLoader(batchFn);

    const [result1, result2] = await Promise.all([
      loader.findManyByContentId(1),
      loader.findManyByContentId(2),
    ]);

    expect(batchFn).toHaveBeenCalledTimes(1);
    expect(batchFn).toHaveBeenCalledWith([1, 2]);
    expect(result1).toHaveLength(1);
    expect(result2).toHaveLength(1);
  });

  it("ItemSortOrder에 없는 아이템은 마지막 정렬", async () => {
    const mockData = [
      { contentId: 1, item: { name: "알 수 없는 아이템" } }, // order: 999
      { contentId: 1, item: { name: "골드" } }, // order: 1
    ];
    const batchFn = jest.fn().mockResolvedValue(mockData);

    const loader = createManyLoader(batchFn);
    const result = await loader.findManyByContentId(1);

    expect(result[0].item.name).toBe("골드");
    expect(result[1].item.name).toBe("알 수 없는 아이템");
  });
});
