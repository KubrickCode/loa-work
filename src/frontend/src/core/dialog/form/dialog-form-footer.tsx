import { Flex } from "@chakra-ui/react";

import { Alert } from "~/core/chakra-components/alert";
import { Button } from "~/core/chakra-components/ui/button";
import {
  DialogFooter as ChakraDialogFooter,
  DialogActionTrigger,
} from "~/core/chakra-components/ui/dialog";
import { FORM_ERROR_FIELD, SubmitButton, useFormContext } from "~/core/form";

export const DialogFormFooter = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const formError = errors[FORM_ERROR_FIELD];

  return (
    <ChakraDialogFooter>
      <Flex align="flex-end" direction="column" gap={2} w="full">
        {formError && (
          <Alert status="error" title={formError?.message?.toString()} />
        )}
        <Flex gap={2}>
          <DialogActionTrigger asChild>
            <Button variant="outline">닫기</Button>
          </DialogActionTrigger>
          <SubmitButton />
        </Flex>
      </Flex>
    </ChakraDialogFooter>
  );
};
