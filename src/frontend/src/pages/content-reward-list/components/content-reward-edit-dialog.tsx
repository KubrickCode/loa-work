import { Flex, Input } from "@chakra-ui/react";
import { Suspense } from "react";
import { Button } from "~/chakra-components/ui/button";
import { Field } from "~/chakra-components/ui/field";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "~/core/dialog";
import { useSafeQuery } from "~/core/graphql";
import { ContentRewardEditDialogDocument } from "~/core/graphql/generated";
import { Loader } from "~/core/loader";

type ContentRewardEditDialogProps = {
  contentId: number;
};

export const ContentRewardEditDialog = ({
  contentId,
}: ContentRewardEditDialogProps) => {
  return (
    <Dialog>
      <DialogHeader>보상 수정</DialogHeader>
      <Suspense fallback={<Loader.Block />}>
        <Body contentId={contentId} />
      </Suspense>
      <DialogFooter>
        <Button>확인</Button>
      </DialogFooter>
    </Dialog>
  );
};

const Body = ({ contentId }: { contentId: number }) => {
  const { data } = useSafeQuery(ContentRewardEditDialogDocument, {
    variables: {
      id: contentId,
    },
  });

  return (
    <DialogBody>
      <Flex direction="column" gap={4}>
        {data.content.contentRewards.map((reward) => (
          <Field key={reward.id} label={reward.itemName}>
            <Input defaultValue={reward.averageQuantity} />
          </Field>
        ))}
      </Flex>
    </DialogBody>
  );
};
