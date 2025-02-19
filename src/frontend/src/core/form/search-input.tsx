import { Input, InputProps } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

import { InputGroup } from "~/chakra-components/ui/input-group";

type SearchInputProps = InputProps & {
  onSearch: (value: string) => void;
};

export const SearchInput = ({ onSearch, ...otherProps }: SearchInputProps) => {
  return (
    <InputGroup startElement={<LuSearch />} startOffset="0px">
      <Input
        onBlur={(e) => onSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch((e.target as HTMLInputElement).value);
          }
        }}
        placeholder="검색..."
        size="xs"
        {...otherProps}
      />
    </InputGroup>
  );
};
