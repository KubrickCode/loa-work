import { IconButton } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

export type FavoriteValue = string | number;

export const getFavoritesFromStorage = <T extends FavoriteValue>(
  key: string
): T[] => {
  try {
    const storedItems = localStorage.getItem(key);
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error(`Error retrieving favorites from storage (${key}):`, error);
    return [];
  }
};

export const saveFavoritesToStorage = <T extends FavoriteValue>(
  key: string,
  favorites: T[]
): void => {
  try {
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error(`Error saving favorites to storage (${key}):`, error);
  }
};

export const toggleFavorite = <T extends FavoriteValue>(
  value: T,
  currentFavorites: T[],
  storageKey?: string
): T[] => {
  const newFavorites = currentFavorites.includes(value)
    ? currentFavorites.filter((item) => item !== value)
    : [...currentFavorites, value];

  if (storageKey) {
    saveFavoritesToStorage(storageKey, newFavorites);
  }

  return newFavorites;
};

type FavoriteIconProps = {
  id: FavoriteValue;
  storageKey: string;
  onChange?: (favorites: FavoriteValue[]) => void;
  externalFavorites?: FavoriteValue[];
};

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  id,
  storageKey,
  onChange,
  externalFavorites,
}) => {
  const [internalFavorites, setInternalFavorites] = useState<FavoriteValue[]>(
    () => getFavoritesFromStorage(storageKey)
  );

  const favorites =
    externalFavorites !== undefined ? externalFavorites : internalFavorites;

  useEffect(() => {
    if (onChange && externalFavorites === undefined) {
      onChange(internalFavorites);
    }
  }, [internalFavorites, onChange, externalFavorites]);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      const newFavorites = toggleFavorite(id, favorites, storageKey);

      if (externalFavorites === undefined) {
        setInternalFavorites(newFavorites);
      }

      if (onChange) {
        onChange(newFavorites);
      }
    },
    [id, favorites, storageKey, onChange, externalFavorites]
  );

  const isFavorite = favorites.includes(id);

  return (
    <IconButton
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      onClick={handleToggle}
      size="sm"
      variant="ghost"
    >
      {isFavorite ? (
        <IoStar color="#FFD700" />
      ) : (
        <IoIosStarOutline color="gray" />
      )}
    </IconButton>
  );
};

export const sortWithFavoritesAtTop = <T,>(
  items: T[],
  getFavoriteId: (item: T) => FavoriteValue,
  favorites: FavoriteValue[]
): T[] => {
  if (!items.length || !favorites.length) return items;

  const favoriteItems = items.filter((item) =>
    favorites.includes(getFavoriteId(item))
  );
  const regularItems = items.filter(
    (item) => !favorites.includes(getFavoriteId(item))
  );

  return [...favoriteItems, ...regularItems];
};
