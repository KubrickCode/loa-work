import { Text } from "@chakra-ui/react";
import _ from "lodash";
import { useFormContext } from "react-hook-form";

export const FieldError = ({ name }: { name: string }) => {
  const context = useFormContext();

  if (!context) {
    console.error("Form Context");
    return null;
  }

  const error = _.get(context.formState.errors, name);

  if (!error) return null;

  return (
    <Text color="danger" fontSize="sm">
      <>{error.message}</>
    </Text>
  );
};
