import { drop, last, take } from "es-toolkit";

import { PageInfo } from "./types";

const CURSOR_PREFIX = "cursor";
const INVALID_CURSOR_FORMAT_MESSAGE = "Invalid cursor format";
const INVALID_CURSOR_ID_MESSAGE = "Invalid cursor ID";
const PAGINATION_SIMULTANEOUS_USE_ERROR =
  "Using `first` and `last` arguments together is not supported.";

export class InvalidCursorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidCursorError";
  }
}

export class PaginationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaginationError";
  }
}

type PaginationArgs = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
};

export const createPageInfo = <T extends { id: number }>(
  items: T[],
  args: PaginationArgs
): { nodes: T[]; pageInfo: PageInfo } => {
  const { after, before, first, last } = args;

  if (first != null && last != null) {
    throw new PaginationError(PAGINATION_SIMULTANEOUS_USE_ERROR);
  }

  if (first != null) {
    const hasNextPage = items.length > first;
    const nodes = hasNextPage ? take(items, first) : items;
    const cursors = createCursors(nodes);

    const pageInfo: PageInfo = {
      endCursor: cursors.endCursor,
      hasNextPage,
      hasPreviousPage: !!after,
      startCursor: cursors.startCursor,
    };

    return { nodes, pageInfo };
  }

  if (last != null) {
    const hasPreviousPage = items.length > last;
    const nodes = hasPreviousPage ? drop(items, 1) : items;
    const cursors = createCursors(nodes);

    const pageInfo: PageInfo = {
      endCursor: cursors.endCursor,
      hasNextPage: !!before,
      hasPreviousPage,
      startCursor: cursors.startCursor,
    };

    return { nodes, pageInfo };
  }

  const cursors = createCursors(items);

  const pageInfo: PageInfo = {
    endCursor: cursors.endCursor,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: cursors.startCursor,
  };

  return { nodes: items, pageInfo };
};

export const decodeCursor = (cursor: string): number => {
  const decoded = Buffer.from(cursor, "base64").toString("utf-8");
  const parts = decoded.split(":");

  if (parts.length !== 2 || parts[0] !== CURSOR_PREFIX) {
    throw new InvalidCursorError(INVALID_CURSOR_FORMAT_MESSAGE);
  }

  const id = parseInt(parts[1], 10);
  if (Number.isNaN(id)) {
    throw new InvalidCursorError(INVALID_CURSOR_ID_MESSAGE);
  }

  return id;
};

export const encodeCursor = (id: number): string => {
  return Buffer.from(`${CURSOR_PREFIX}:${id}`).toString("base64");
};

const createCursors = <T extends { id: number }>(nodes: T[]) => {
  if (nodes.length === 0) {
    return { endCursor: undefined, startCursor: undefined };
  }

  return {
    endCursor: encodeCursor(last(nodes).id),
    startCursor: encodeCursor(nodes[0].id),
  };
};
