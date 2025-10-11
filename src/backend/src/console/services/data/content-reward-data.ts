import { Prisma } from "@prisma/client";

export const getContentsWithRewards = ({
  chaosGateId,
  cubeId,
  epicRaidId,
  eponaQuestId,
  fieldBossId,
  guardianRaidId,
  itemIds,
  kazerosRaidId,
  kurzanId,
}: {
  chaosGateId: number;
  cubeId: number;
  epicRaidId: number;
  eponaQuestId: number;
  fieldBossId: number;
  guardianRaidId: number;
  itemIds: {
    cardExpId: number;
    destinyBreakstoneId: number;
    destinyDestructionId: number;
    destinyFragmentId: number;
    destinyGuardianId: number;
    goldId: number;
    iceBreathId: number;
    lavaBreathId: number;
    level1GemId: number;
    sillingId: number;
  };
  kazerosRaidId: number;
  kurzanId: number;
}): Prisma.ContentUncheckedCreateInput[] => [
  {
    contentCategoryId: kurzanId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 173415,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 21900,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 10.8,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 166.6,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 450.9,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
          {
            averageQuantity: 2.7,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
        ],
      },
    },
    level: 1640,
    name: "아비도스 1 작전",
  },
  {
    contentCategoryId: kurzanId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 188312,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 28907,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 14.3,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 178,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 515,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
          {
            averageQuantity: 4.3,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
        ],
      },
    },
    level: 1660,
    name: "아비도스 2 작전",
  },
  {
    contentCategoryId: kurzanId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 195058,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 32476,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 17.5,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 220.6,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 626.6,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
          {
            averageQuantity: 4.4,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
        ],
      },
    },
    level: 1680,
    name: "아비도스 3 작전",
  },
  {
    contentCategoryId: guardianRaidId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 35120,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 12.4,
            isSellable: true,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 96.2,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 286.7,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    level: 1640,
    name: "아게오로스",
  },
  {
    contentCategoryId: guardianRaidId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 39046,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 17.6,
            isSellable: true,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 148.4,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 450,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    level: 1680,
    name: "스콜라키아",
  },
  {
    contentCategoryId: cubeId,
    contentDuration: {
      create: {
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 139591,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 14,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 9,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 4,
            isSellable: false,
            itemId: itemIds.lavaBreathId,
          },
          {
            averageQuantity: 4,
            isSellable: false,
            itemId: itemIds.iceBreathId,
          },
          {
            averageQuantity: 14000,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1640,
    name: "제 1 해금",
  },
  {
    contentCategoryId: cubeId,
    contentDuration: {
      create: {
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 150322,
            isSellable: false,
            itemId: itemIds.sillingId,
          },
          {
            averageQuantity: 25,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 18,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 5,
            isSellable: false,
            itemId: itemIds.lavaBreathId,
          },
          {
            averageQuantity: 5,
            isSellable: false,
            itemId: itemIds.iceBreathId,
          },
          {
            averageQuantity: 14500,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1680,
    name: "제 2 해금",
  },
  {
    contentCategoryId: eponaQuestId,
    contentDuration: {
      create: {
        value: 60,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 750,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 1380,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 5,
            isSellable: false,
            itemId: itemIds.destinyBreakstoneId,
          },
          {
            averageQuantity: 1,
            isSellable: false,
            itemId: itemIds.lavaBreathId,
          },
          {
            averageQuantity: 1,
            isSellable: false,
            itemId: itemIds.iceBreathId,
          },
        ],
      },
    },
    level: 1640,
    name: "1640 에포나 의뢰(x3)",
  },
  {
    contentCategoryId: chaosGateId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 4000,
            isSellable: true,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 2,
            isSellable: true,
            itemId: itemIds.lavaBreathId,
          },
          {
            averageQuantity: 2,
            isSellable: true,
            itemId: itemIds.iceBreathId,
          },
          {
            averageQuantity: 2,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 2500,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1640,
    name: "1640 카오스게이트",
  },
  {
    contentCategoryId: chaosGateId,
    contentDuration: {
      create: {
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 4500,
            isSellable: true,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 3,
            isSellable: true,
            itemId: itemIds.lavaBreathId,
          },
          {
            averageQuantity: 3,
            isSellable: true,
            itemId: itemIds.iceBreathId,
          },
          {
            averageQuantity: 3,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 6000,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1680,
    name: "1680 카오스게이트",
  },
  {
    contentCategoryId: fieldBossId,
    contentDuration: {
      create: {
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 40,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 120,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
          {
            averageQuantity: 12,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 2500,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1640,
    name: "1640 세베크 아툰",
  },
  {
    contentCategoryId: fieldBossId,
    contentDuration: {
      create: {
        value: 120,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 60,
            isSellable: true,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 180,
            isSellable: true,
            itemId: itemIds.destinyGuardianId,
          },
          {
            averageQuantity: 16,
            isSellable: true,
            itemId: itemIds.level1GemId,
          },
          {
            averageQuantity: 2500,
            isSellable: false,
            itemId: itemIds.cardExpId,
          },
        ],
      },
    },
    level: 1680,
    name: "1680 세베크 아툰",
  },
  {
    contentCategoryId: epicRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 7000,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 3000,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 210,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 420,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -3100,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 4000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 600,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 800,
          },
        ],
      },
    },
    gate: 1,
    level: 1640,
    name: "[노말]폭풍의 지휘관, 베히모스",
  },
  {
    contentCategoryId: epicRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 14500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4000,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 270,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 540,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -4900,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 6000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 900,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1800,
          },
        ],
      },
    },
    gate: 2,
    level: 1640,
    name: "[노말]폭풍의 지휘관, 베히모스",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 6000,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 2700,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 200,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 400,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -2800,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 3800,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 550,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1100,
          },
        ],
      },
    },
    gate: 1,
    level: 1640,
    name: "[하드]붉어진 백야의 나선",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 12500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 3800,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 260,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 520,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -4100,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 5800,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 850,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1700,
          },
        ],
      },
    },
    gate: 2,
    level: 1640,
    name: "[하드]붉어진 백야의 나선",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 7500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 3600,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 480,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 960,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -3200,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 6500,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 700,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1400,
          },
        ],
      },
    },
    gate: 1,
    level: 1660,
    name: "[노말]대지를 부수는 업화의 궤적",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 15500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4400,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 580,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1160,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -5300,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 9500,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 1000,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 2000,
          },
        ],
      },
    },
    gate: 2,
    level: 1660,
    name: "[노말]대지를 부수는 업화의 궤적",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 8500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4000,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 540,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1080,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -3800,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 7000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 800,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1600,
          },
        ],
      },
    },
    gate: 1,
    level: 1670,
    name: "[노말]부유하는 악몽의 진혼곡",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 16500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4600,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 640,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1280,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -5200,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 10500,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 1050,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 2100,
          },
        ],
      },
    },
    gate: 2,
    level: 1670,
    name: "[노말]부유하는 악몽의 진혼곡",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 9000,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4200,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 680,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1320,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -4100,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 7500,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 850,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1700,
          },
        ],
      },
    },
    gate: 1,
    level: 1680,
    name: "[하드]대지를 부수는 업화의 궤적",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 18500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 5400,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 660,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1320,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -6600,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 11000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 1150,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 2300,
          },
        ],
      },
    },
    gate: 2,
    level: 1680,
    name: "[하드]대지를 부수는 업화의 궤적",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 10000,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 4600,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 640,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1280,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -4500,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 8000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 950,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 1900,
          },
        ],
      },
    },
    gate: 1,
    level: 1690,
    name: "[하드]부유하는 악몽의 진혼곡",
  },
  {
    contentCategoryId: kazerosRaidId,
    contentDuration: {
      create: {
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            averageQuantity: 20500,
            isSellable: true,
            itemId: itemIds.goldId,
          },
          {
            averageQuantity: 6000,
            isSellable: false,
            itemId: itemIds.destinyFragmentId,
          },
          {
            averageQuantity: 700,
            isSellable: false,
            itemId: itemIds.destinyDestructionId,
          },
          {
            averageQuantity: 1400,
            isSellable: false,
            itemId: itemIds.destinyGuardianId,
          },
        ],
      },
    },
    contentSeeMoreRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            quantity: -7200,
          },
          {
            itemId: itemIds.destinyFragmentId,
            quantity: 14000,
          },
          {
            itemId: itemIds.destinyDestructionId,
            quantity: 1400,
          },
          {
            itemId: itemIds.destinyGuardianId,
            quantity: 2800,
          },
        ],
      },
    },
    gate: 2,
    level: 1690,
    name: "[하드]부유하는 악몽의 진혼곡",
  },
];
