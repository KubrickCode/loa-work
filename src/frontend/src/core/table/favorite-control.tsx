import { IconButton } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

import {
  ANIMATION_DURATIONS,
  EASING,
} from "~/core/animations/micro-interactions";

const MotionIconButton = motion.create(IconButton);

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
  const [isAnimating, setIsAnimating] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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

      const wasNotFavorite = !favorites.includes(id);
      const newFavorites = toggleFavorite(id, favorites, storageKey);

      if (wasNotFavorite && !shouldReduceMotion) {
        setIsAnimating(true);
        setTimeout(
          () => setIsAnimating(false),
          ANIMATION_DURATIONS.slow * 1000
        );
      }

      if (externalFavorites === undefined) {
        setInternalFavorites(newFavorites);
      }

      if (onChange) {
        onChange(newFavorites);
      }
    },
    [id, favorites, storageKey, onChange, externalFavorites, shouldReduceMotion]
  );

  const isFavorite = favorites.includes(id);

  return (
    <MotionIconButton
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "gold.500",
        outlineOffset: "2px",
      }}
      _hover={{
        bg: {
          _light: "gray.100",
          _dark: "whiteAlpha.100",
        },
      }}
      animate={
        isAnimating && !shouldReduceMotion
          ? {
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0px rgba(255, 215, 0, 0)",
                "0 0 25px rgba(255, 215, 0, 0.8)",
                "0 0 10px rgba(255, 215, 0, 0.3)",
              ],
              rotate: [0, 10, -10, 0],
            }
          : {}
      }
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFavorite}
      minH={{ base: "44px", md: "32px" }}
      minW={{ base: "44px", md: "32px" }}
      onClick={handleToggle}
      size={{ base: "md", md: "sm" }}
      transition={{
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.easeOut,
      }}
      variant="ghost"
      whileHover={
        !shouldReduceMotion
          ? {
              scale: 1.05,
              boxShadow: isFavorite
                ? "0 0 15px rgba(255, 215, 0, 0.5)"
                : "0 0 10px rgba(128, 128, 128, 0.3)",
            }
          : undefined
      }
      whileTap={
        !shouldReduceMotion
          ? {
              scale: 0.9,
            }
          : undefined
      }
    >
      {isFavorite ? (
        <motion.div
          animate={
            !shouldReduceMotion
              ? {
                  scale: isAnimating ? [1, 1.3, 1] : 1,
                  rotate: isAnimating ? [0, 360] : 0,
                }
              : {}
          }
          initial={false}
          transition={{
            duration: ANIMATION_DURATIONS.slow,
            ease: EASING.spring,
          }}
        >
          <IoStar color="gold.500" size={20} />
        </motion.div>
      ) : (
        <motion.div
          transition={{
            duration: ANIMATION_DURATIONS.fast,
            ease: EASING.easeOut,
          }}
          whileHover={!shouldReduceMotion ? { scale: 1.1 } : undefined}
        >
          <IoIosStarOutline color="gray" size={20} />
        </motion.div>
      )}
    </MotionIconButton>
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
