import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

import { FORM_ERROR_FIELD } from "./use-mutation-form";
import { Alert } from "../chakra-components/alert";

export const FormFooter = ({ children }: PropsWithChildren) => {
  const {
    formState: { errors },
  } = useFormContext();

  const formError = errors[FORM_ERROR_FIELD];

  return (
    <Flex direction="column" gap={2} w="full">
      <Flex gap={2} justify="flex-end">
        {children}
      </Flex>
      {formError && formError.message && (
        <Alert status="error" title={formError.message.toString()} />
      )}
    </Flex>
  );
};
