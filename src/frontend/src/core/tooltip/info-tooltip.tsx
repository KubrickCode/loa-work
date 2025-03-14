import { IoIosInformationCircleOutline } from "react-icons/io";

import { Tooltip } from "../chakra-components/ui/tooltip";

export const InfoTooltip = ({ content }: { content: string }) => {
  return (
    <Tooltip content={content}>
      <IoIosInformationCircleOutline />
    </Tooltip>
  );
};
