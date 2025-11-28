import { IconButton, Input, InputProps } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

import { InputGroup } from "~/components/chakra/ui/input-group";

type SearchInputProps = InputProps & {
  onSearch: (value: string) => void;
  value: string;
};

export const SearchInput = ({
  maxWidth = "xs",
  onSearch,
  value,
  ...otherProps
}: SearchInputProps) => {
  const [input, setInput] = useState(value);

  const onSubmit = useCallback(
    (value: string) => {
      onSearch(value);
      setInput(value);
    },
    [onSearch]
  );

  const reset = useCallback(
    (clear: boolean) => {
      if (clear) {
        onSubmit("");
      } else {
        setInput(value);
      }
    },
    [onSubmit, value]
  );

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <InputGroup
      endElement={
        <IconButton
          _hover={{
            bg: "bg.hover",
          }}
          h="fit-content"
          minW={0}
          onClick={() => reset(true)}
          size="xs"
          variant="ghost"
          visibility={input ? "visible" : "hidden"}
          w="fit-content"
        >
          <IoCloseOutline onClick={() => reset(true)} />
        </IconButton>
      }
      endOffset="-2px"
      maxWidth={maxWidth}
      startElement={<LuSearch />}
      startOffset="0px"
      {...otherProps}
    >
      <Input
        bg={{
          _dark: "bg.elevated",
          _light: "bg.surface",
        }}
        borderColor={{
          _dark: "border.muted",
          _light: "border.default",
        }}
        enterKeyHint="search"
        onBlur={() => reset(false)}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit((e.target as HTMLInputElement).value);
          }
        }}
        placeholder="검색..."
        size="xs"
        transition="all 0.2s ease-in-out"
        value={input}
      />
    </InputGroup>
  );
};
