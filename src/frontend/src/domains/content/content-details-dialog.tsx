import { Flex } from "@chakra-ui/react";

import { Dialog, DialogProps } from "~/components/dialog";
import { DialogCloseButton } from "~/components/dialog/dialog-close-button";
import {
  ContentDetailsDialogDocument,
  ContentDetailsDialogQuery,
  ContentDetailsDialogQueryVariables,
} from "~/libs/graphql/generated";

import {
  ContentBasicInfoSection,
  ContentRewardSection,
  ContentSeeMoreRewardSection,
  ContentWageSection,
} from "./components";

type ContentDetailsDialogProps = DialogProps & {
  contentId: number;
  onComplete: () => void;
};

export const ContentDetailsDialog = ({
  contentId,
  onClose,
  onComplete,
  open,
}: ContentDetailsDialogProps) => {
  return (
    <Dialog<ContentDetailsDialogQuery, ContentDetailsDialogQueryVariables>
      onClose={() => {
        onClose();
        onComplete();
      }}
      open={open}
      query={ContentDetailsDialogDocument}
      queryVariables={{ contentId }}
      size="xl"
    >
      {({ queryData: data, refetch }) => (
        <>
          <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap={4}>
              <ContentBasicInfoSection content={data.content} />
              <ContentWageSection contentId={contentId} items={data.items} />
              <ContentRewardSection
                contentId={contentId}
                contentRewards={data.content.contentRewards}
                onRefetch={refetch}
              />
              {data.content.contentSeeMoreRewards.length > 0 && (
                <ContentSeeMoreRewardSection
                  contentId={contentId}
                  contentSeeMoreRewards={data.content.contentSeeMoreRewards}
                  onRefetch={refetch}
                />
              )}
            </Flex>
          </Dialog.Body>
          <Dialog.Footer>
            <DialogCloseButton />
          </Dialog.Footer>
        </>
      )}
    </Dialog>
  );
};
