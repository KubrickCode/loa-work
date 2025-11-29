import { useToken } from "@chakra-ui/react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { ANIMATION_DURATIONS } from "~/components/animations/micro-interactions";

export type FavoriteValue = string | number;

const BOX_SHADOWS = {
  ANIMATING: [
    "0 0 0px rgba(255, 215, 0, 0)",
    "0 0 25px rgba(255, 215, 0, 0.8)",
    "0 0 10px rgba(255, 215, 0, 0.3)",
    "0 0 0px rgba(255, 215, 0, 0)",
  ] as string[],
  HOVER_FAVORITE: "0 0 15px rgba(255, 215, 0, 0.5)",
  HOVER_NORMAL: "0 0 10px rgba(128, 128, 128, 0.3)",
  NONE: "0 0 0px rgba(255, 215, 0, 0)",
};

type UseFavoriteIconOptions = {
  externalFavorites?: FavoriteValue[];
  id: FavoriteValue;
  onChange?: (favorites: FavoriteValue[]) => void;
  storageKey: string;
};

type ButtonAnimationState = {
  boxShadow: string | string[];
  rotate?: number | number[];
  scale: number | number[];
};

type UseFavoriteIconReturn = {
  buttonAnimation: ButtonAnimationState;
  gold500: string;
  gray400: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleToggle: (e: React.MouseEvent) => void;
  isAnimating: boolean;
  isFavorite: boolean;
  shouldReduceMotion: boolean;
};

const getFavoritesFromStorage = <T extends FavoriteValue>(key: string): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(`Error retrieving favorites from storage (${key}):`, error);
    return [];
  }
};

const saveFavoritesToStorage = <T extends FavoriteValue>(key: string, favorites: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(favorites));
  } catch (error) {
    console.error(`Error saving favorites to storage (${key}):`, error);
  }
};

type GetButtonAnimationOptions = {
  isAnimating: boolean;
  isFavorite: boolean;
  isHovered: boolean;
  shouldReduceMotion: boolean;
};

const getButtonAnimation = ({
  isAnimating,
  isFavorite,
  isHovered,
  shouldReduceMotion,
}: GetButtonAnimationOptions): ButtonAnimationState => {
  if (isAnimating && !shouldReduceMotion) {
    return {
      boxShadow: BOX_SHADOWS.ANIMATING,
      rotate: [0, 10, -10, 0],
      scale: [1, 1.2, 1],
    };
  }

  if (isHovered && !shouldReduceMotion && !isAnimating) {
    return {
      boxShadow: isFavorite ? BOX_SHADOWS.HOVER_FAVORITE : BOX_SHADOWS.HOVER_NORMAL,
      scale: 1.05,
    };
  }

  return {
    boxShadow: BOX_SHADOWS.NONE,
    scale: 1,
  };
};

export const useFavoriteIcon = ({
  externalFavorites,
  id,
  onChange,
  storageKey,
}: UseFavoriteIconOptions): UseFavoriteIconReturn => {
  const isControlled = externalFavorites !== undefined;

  const [internalFavorites, setInternalFavorites] = useState<FavoriteValue[]>(() =>
    getFavoritesFromStorage(storageKey)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const shouldReduceMotion = useReducedMotion() ?? false;
  const [gold500, gray400] = useToken("colors", ["gold.500", "gray.400"]);

  const favorites = isControlled ? externalFavorites : internalFavorites;
  const isFavorite = favorites.includes(id);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      (e.currentTarget as HTMLElement).blur();
      setIsHovered(false);

      const wasNotFavorite = !isFavorite;
      const newFavorites = isFavorite
        ? favorites.filter((item) => item !== id)
        : [...favorites, id];

      saveFavoritesToStorage(storageKey, newFavorites);

      if (!isControlled) {
        setInternalFavorites(newFavorites);
      }
      onChange?.(newFavorites);

      if (wasNotFavorite && !shouldReduceMotion) {
        setIsAnimating(true);
      }
    },
    [id, isFavorite, isControlled, favorites, storageKey, onChange, shouldReduceMotion]
  );

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
      setIsHovered(false);
    }, ANIMATION_DURATIONS.slow * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isAnimating]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const buttonAnimation = getButtonAnimation({
    isAnimating,
    isFavorite,
    isHovered,
    shouldReduceMotion,
  });

  return {
    buttonAnimation,
    gold500,
    gray400,
    handleMouseEnter,
    handleMouseLeave,
    handleToggle,
    isAnimating,
    isFavorite,
    shouldReduceMotion,
  };
};

// Re-export for external usage
export { getFavoritesFromStorage, saveFavoritesToStorage };
