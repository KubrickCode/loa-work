import { createPageInfo, decodeCursor, encodeCursor } from "./helpers";

describe("Pagination Helpers", () => {
  describe("encodeCursor", () => {
    it("ID를 base64 커서로 인코딩", () => {
      const cursor = encodeCursor(123);
      expect(cursor).toBe(Buffer.from("cursor:123").toString("base64"));
    });
  });

  describe("decodeCursor", () => {
    it("base64 커서를 ID로 디코딩", () => {
      const cursor = Buffer.from("cursor:456").toString("base64");
      const id = decodeCursor(cursor);
      expect(id).toBe(456);
    });

    it("encodeCursor로 인코딩한 커서를 디코딩하면 원본 ID 반환", () => {
      const originalId = 789;
      const cursor = encodeCursor(originalId);
      const decodedId = decodeCursor(cursor);
      expect(decodedId).toBe(originalId);
    });

    it("잘못된 커서 포맷인 경우 에러 발생", () => {
      const invalidCursor = Buffer.from("invalid").toString("base64");
      expect(() => decodeCursor(invalidCursor)).toThrow("Invalid cursor format");
    });

    it("커서 ID가 숫자가 아닌 경우 에러 발생", () => {
      const invalidCursor = Buffer.from("cursor:abc").toString("base64");
      expect(() => decodeCursor(invalidCursor)).toThrow("Invalid cursor ID");
    });
  });

  describe("createPageInfo", () => {
    it("first + 1개의 아이템이 있을 때 hasNextPage true 반환 및 슬라이싱", () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const result = createPageInfo(items, { first: 3 });

      expect(result.pageInfo.hasNextPage).toBe(true);
      expect(result.pageInfo.hasPreviousPage).toBe(false);
      expect(result.nodes).toHaveLength(3);
      expect(result.nodes[0].id).toBe(1);
      expect(result.nodes[2].id).toBe(3);
      expect(result.pageInfo.startCursor).toBe(encodeCursor(1));
      expect(result.pageInfo.endCursor).toBe(encodeCursor(3));
    });

    it("items 길이가 first와 같으면 hasNextPage false 반환", () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = createPageInfo(items, { first: 3 });

      expect(result.pageInfo.hasNextPage).toBe(false);
      expect(result.pageInfo.hasPreviousPage).toBe(false);
      expect(result.nodes).toHaveLength(3);
    });

    it("items 길이가 first보다 작으면 hasNextPage false 반환", () => {
      const items = [{ id: 1 }, { id: 2 }];
      const result = createPageInfo(items, { first: 3 });

      expect(result.pageInfo.hasNextPage).toBe(false);
      expect(result.pageInfo.hasPreviousPage).toBe(false);
      expect(result.nodes).toHaveLength(2);
    });

    it("last + 1개의 아이템이 있을 때 hasPreviousPage true 반환 및 슬라이싱", () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
      const result = createPageInfo(items, { last: 3 });

      expect(result.pageInfo.hasNextPage).toBe(false);
      expect(result.pageInfo.hasPreviousPage).toBe(true);
      expect(result.nodes).toHaveLength(3);
      expect(result.nodes[0].id).toBe(2);
      expect(result.nodes[2].id).toBe(4);
    });

    it("빈 배열인 경우 커서는 undefined 반환", () => {
      const items: { id: number }[] = [];
      const result = createPageInfo(items, { first: 10 });

      expect(result.pageInfo.startCursor).toBeUndefined();
      expect(result.pageInfo.endCursor).toBeUndefined();
      expect(result.nodes).toHaveLength(0);
    });

    it("after 커서와 함께 first + 1 페이지네이션 처리", () => {
      const items = [{ id: 10 }, { id: 11 }, { id: 12 }];
      const afterCursor = encodeCursor(9);
      const result = createPageInfo(items, { after: afterCursor, first: 2 });

      expect(result.pageInfo.hasNextPage).toBe(true);
      expect(result.nodes).toHaveLength(2);
      expect(result.pageInfo.startCursor).toBe(encodeCursor(10));
      expect(result.pageInfo.endCursor).toBe(encodeCursor(11));
    });

    it("first와 last가 함께 주어지면 에러 발생", () => {
      const items = [{ id: 1 }];
      expect(() => createPageInfo(items, { first: 1, last: 1 })).toThrow(
        "Using `first` and `last` arguments together is not supported."
      );
    });

    it("after 커서가 있으면 hasPreviousPage가 true여야 합니다", () => {
      const items = [{ id: 10 }, { id: 11 }];
      const result = createPageInfo(items, { after: encodeCursor(9), first: 2 });
      expect(result.pageInfo.hasPreviousPage).toBe(true);
    });

    it("before 커서가 있으면 hasNextPage가 true여야 합니다", () => {
      const items = [{ id: 1 }, { id: 2 }];
      const result = createPageInfo(items, { before: encodeCursor(3), last: 2 });
      expect(result.pageInfo.hasNextPage).toBe(true);
    });
  });
});
