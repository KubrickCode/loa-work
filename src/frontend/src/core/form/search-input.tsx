import { Input, InputProps, IconButton } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";

import { InputGroup } from "~/core/chakra-components/ui/input-group";

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
    [input, onSearch]
  );

  const reset = useCallback(
    (clear: boolean) => {
      if (clear) {
        onSubmit("");
      } else {
        setInput(value);
      }
    },
    [onSearch, value]
  );

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <InputGroup
      endElement={
        <IconButton
          _hover={{ bg: "rgba(148, 137, 137, 0.13)" }}
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
        value={input}
      />
    </InputGroup>
  );
};
