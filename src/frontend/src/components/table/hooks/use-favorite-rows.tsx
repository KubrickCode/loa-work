import { partition } from "es-toolkit/array";
import { get } from "es-toolkit/compat";
import { useMemo } from "react";

import { FavoriteValue } from "../favorite-control";

const isFavoriteValue = (value: unknown): value is FavoriteValue => {
  return typeof value === "string" || typeof value === "number";
};

type UseFavoriteRowsOptions<T> = {
  favoriteKeyPath?: string;
  favorites: FavoriteValue[];
  rows: Array<{ data: T }>;
};

type UseFavoriteRowsReturn<T> = {
  favoriteRows: Array<{ data: T }>;
  hasFavoriteFeature: boolean;
  normalRows: Array<{ data: T }>;
};

export const useFavoriteRows = <T,>({
  favoriteKeyPath,
  favorites,
  rows,
}: UseFavoriteRowsOptions<T>): UseFavoriteRowsReturn<T> => {
  return useMemo(() => {
    const hasFavoriteFeature = !!favoriteKeyPath && favorites.length > 0;

    if (!hasFavoriteFeature) {
      return {
        favoriteRows: [],
        hasFavoriteFeature: false,
        normalRows: [...rows],
      };
    }

    const [favoriteRows, normalRows] = partition(rows, (row) => {
      const value = get(row.data, favoriteKeyPath);
      return isFavoriteValue(value) && favorites.includes(value);
    });

    return {
      favoriteRows,
      hasFavoriteFeature,
      normalRows,
    };
  }, [favoriteKeyPath, favorites, rows]);
};
