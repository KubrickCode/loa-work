import { IconButton, useToken } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

import { ANIMATION_DURATIONS, EASING } from "~/core/animations/micro-interactions";

const MotionIconButton = motion.create(IconButton);

export type FavoriteValue = string | number;

export const getFavoritesFromStorage = <T extends FavoriteValue>(key: string): T[] => {
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
  externalFavorites?: FavoriteValue[];
  id: FavoriteValue;
  onChange?: (favorites: FavoriteValue[]) => void;
  storageKey: string;
};

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  externalFavorites,
  id,
  onChange,
  storageKey,
}) => {
  const [internalFavorites, setInternalFavorites] = useState<FavoriteValue[]>(() =>
    getFavoritesFromStorage(storageKey)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [gold500] = useToken("colors", "gold.500");

  const favorites = externalFavorites !== undefined ? externalFavorites : internalFavorites;

  useEffect(() => {
    if (onChange && externalFavorites === undefined) {
      onChange(internalFavorites);
    }
  }, [internalFavorites, onChange, externalFavorites]);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      setIsHovered(false);
      const element = e.currentTarget as HTMLElement;
      element.blur();

      const mouseLeaveEvent = new MouseEvent("mouseleave", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      element.dispatchEvent(mouseLeaveEvent);

      const wasNotFavorite = !favorites.includes(id);
      const newFavorites = toggleFavorite(id, favorites, storageKey);

      if (wasNotFavorite && !shouldReduceMotion) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsAnimating(false);
          setIsHovered(false);
        }, ANIMATION_DURATIONS.slow * 1000);
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
      animate={
        isAnimating && !shouldReduceMotion
          ? {
              boxShadow: [
                "0 0 0px rgba(255, 215, 0, 0)",
                "0 0 25px rgba(255, 215, 0, 0.8)",
                "0 0 10px rgba(255, 215, 0, 0.3)",
                "0 0 0px rgba(255, 215, 0, 0)",
              ],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1],
            }
          : isHovered && !shouldReduceMotion && !isAnimating
            ? {
                boxShadow: isFavorite
                  ? "0 0 15px rgba(255, 215, 0, 0.5)"
                  : "0 0 10px rgba(128, 128, 128, 0.3)",
                scale: 1.05,
              }
            : {
                boxShadow: "0 0 0px rgba(255, 215, 0, 0)",
                scale: 1,
              }
      }
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      aria-pressed={isFavorite}
      minH={{ base: "44px", md: "32px" }}
      minW={{ base: "44px", md: "32px" }}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      size={{ base: "md", md: "sm" }}
      style={{
        backgroundColor: isHovered
          ? process.env.NODE_ENV === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"
          : undefined,
      }}
      transition={{
        duration: ANIMATION_DURATIONS.normal,
        ease: EASING.easeOut,
      }}
      variant="ghost"
    >
      {isFavorite ? (
        <motion.div
          animate={
            !shouldReduceMotion
              ? {
                  rotate: isAnimating ? [0, 360] : 0,
                  scale: isAnimating ? [1, 1.3, 1] : 1,
                }
              : {}
          }
          initial={false}
          transition={{
            duration: ANIMATION_DURATIONS.slow,
            ease: EASING.spring,
          }}
        >
          <IoStar color={gold500} size={20} />
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

  const favoriteItems = items.filter((item) => favorites.includes(getFavoriteId(item)));
  const regularItems = items.filter((item) => !favorites.includes(getFavoriteId(item)));

  return [...favoriteItems, ...regularItems];
};
