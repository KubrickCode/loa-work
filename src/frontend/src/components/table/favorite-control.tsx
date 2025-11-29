import { IconButton } from "@chakra-ui/react";
import { partition } from "es-toolkit/array";
import { motion } from "framer-motion";
import React from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

import { ANIMATION_DURATIONS, EASING } from "~/components/animations/micro-interactions";

import {
  FavoriteValue,
  getFavoritesFromStorage,
  saveFavoritesToStorage,
  useFavoriteIcon,
} from "./hooks/use-favorite-icon";

const MotionIconButton = motion.create(IconButton);

export type { FavoriteValue };
export { getFavoritesFromStorage, saveFavoritesToStorage };

type FavoriteIconProps = {
  externalFavorites?: FavoriteValue[];
  id: FavoriteValue;
  onChange?: (favorites: FavoriteValue[]) => void;
  storageKey: string;
};

export const FavoriteIcon: React.FC<FavoriteIconProps> = (props) => {
  const {
    buttonAnimation,
    gold500,
    gray400,
    handleMouseEnter,
    handleMouseLeave,
    handleToggle,
    isAnimating,
    isFavorite,
    shouldReduceMotion,
  } = useFavoriteIcon(props);

  return (
    <MotionIconButton
      animate={buttonAnimation}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFavorite}
      minH={{ base: "44px", md: "32px" }}
      minW={{ base: "44px", md: "32px" }}
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      size={{ base: "md", md: "sm" }}
      transition={{ duration: ANIMATION_DURATIONS.normal, ease: EASING.easeOut }}
      variant="ghost"
    >
      {isFavorite ? (
        <motion.div
          animate={
            !shouldReduceMotion
              ? { rotate: isAnimating ? [0, 360] : 0, scale: isAnimating ? [1, 1.3, 1] : 1 }
              : {}
          }
          initial={false}
          transition={{ duration: ANIMATION_DURATIONS.slow, ease: EASING.spring }}
        >
          <IoStar color={gold500} size={20} />
        </motion.div>
      ) : (
        <motion.div
          transition={{ duration: ANIMATION_DURATIONS.fast, ease: EASING.easeOut }}
          whileHover={!shouldReduceMotion ? { scale: 1.1 } : undefined}
        >
          <IoIosStarOutline color={gray400} size={20} />
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

  const [favoriteItems, regularItems] = partition(items, (item) =>
    favorites.includes(getFavoriteId(item))
  );

  return [...favoriteItems, ...regularItems];
};

export const isFavoriteValue = (value: unknown, favorites: FavoriteValue[]): boolean => {
  return (typeof value === "string" || typeof value === "number") && favorites.includes(value);
};

export const getFavoriteRowStyles = (isFavorite: boolean, isInteractive: boolean) => ({
  bg: isFavorite ? "bg.favorite" : undefined,
  css: isInteractive
    ? {
        "&:hover": {
          background: isFavorite
            ? "var(--chakra-colors-bg-favorite-hover) !important"
            : "var(--chakra-colors-bg-hover) !important",
        },
      }
    : undefined,
});
