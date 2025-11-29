import { Flex } from "@chakra-ui/react";
import { Suspense } from "react";

import { Dialog, DialogProps } from "~/components/dialog";
import { DialogCloseButton } from "~/components/dialog/dialog-close-button";
import { TextLoader } from "~/components/loader";
import { Section } from "~/components/section";
import {
  ContentGroupDetailsDialogDocument,
  ContentGroupDetailsDialogQuery,
  ContentGroupDetailsDialogQueryVariables,
} from "~/libs/graphql/generated";

import { ContentSection } from "./components";

type ContentGroupDetailsDialogProps = {
  contentIds: number[];
  onComplete: () => void;
} & DialogProps;

export const ContentGroupDetailsDialog = ({
  contentIds,
  onClose,
  onComplete,
  open,
}: ContentGroupDetailsDialogProps) => {
  return (
    <Dialog<ContentGroupDetailsDialogQuery, ContentGroupDetailsDialogQueryVariables>
      onClose={() => {
        onClose();
        onComplete();
      }}
      open={open}
      query={ContentGroupDetailsDialogDocument}
      queryVariables={{ contentIds }}
      size="xl"
    >
      {({ queryData: data, refetch }) => (
        <>
          <Dialog.Header>컨텐츠 상세 정보</Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap={4}>
              <Suspense fallback={<TextLoader />}>
                {data.contentGroup.contents.length > 1 ? (
                  data.contentGroup.contents.map((content) => (
                    <Section key={content.id} title={`${content.gate}관문`}>
                      <ContentSection content={content} items={data.items} onRefetch={refetch} />
                    </Section>
                  ))
                ) : (
                  <ContentSection
                    content={data.contentGroup.contents[0]}
                    items={data.items}
                    onRefetch={refetch}
                  />
                )}
              </Suspense>
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
