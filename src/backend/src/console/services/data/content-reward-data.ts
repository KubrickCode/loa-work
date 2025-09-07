import { Prisma } from '@prisma/client';

export const getContentsWithRewards = ({
  kurzanId,
  guardianRaidId,
  eponaQuestId,
  cubeId,
  chaosGateId,
  fieldBossId,
  epicRaidId,
  kazerosRaidId,
  itemIds,
}: {
  kurzanId: number;
  guardianRaidId: number;
  eponaQuestId: number;
  cubeId: number;
  chaosGateId: number;
  fieldBossId: number;
  epicRaidId: number;
  kazerosRaidId: number;
  itemIds: {
    goldId: number;
    sillingId: number;
    destinyFragmentId: number;
    destinyBreakstoneId: number;
    destinyDestructionId: number;
    destinyGuardianId: number;
    level1GemId: number;
    lavaBreathId: number;
    iceBreathId: number;
    cardExpId: number;
  };
}): Prisma.ContentUncheckedCreateInput[] => [
  {
    name: '아비도스 1 작전',
    contentCategoryId: kurzanId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 173415,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 21900,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 10.8,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 166.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 450.9,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 2.7,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 2 작전',
    contentCategoryId: kurzanId,
    level: 1660,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 188312,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 28907,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 14.3,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 178,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 515,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 4.3,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 3 작전',
    contentCategoryId: kurzanId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 195058,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 32476,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 17.5,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 220.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 626.6,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 4.4,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '아게오로스',
    contentCategoryId: guardianRaidId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 35120,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 12.4,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 96.2,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 286.7,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '스콜라키아',
    contentCategoryId: guardianRaidId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 39046,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 17.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 148.4,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 450,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '제 1 해금',
    contentCategoryId: cubeId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 139591,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 14,
            isSellable: false,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 9,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            defaultAverageQuantity: 4,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            defaultAverageQuantity: 4,
            isSellable: false,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 14000,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '제 2 해금',
    contentCategoryId: cubeId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            defaultAverageQuantity: 150322,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 25,
            isSellable: false,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 18,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            defaultAverageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            defaultAverageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 14500,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '1640 에포나 의뢰(x3)',
    contentCategoryId: eponaQuestId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 60,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 750,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 1380,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            defaultAverageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.lavaBreathId,
            defaultAverageQuantity: 1,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            defaultAverageQuantity: 1,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '1640 카오스게이트',
    contentCategoryId: chaosGateId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.iceBreathId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 2500,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '1680 카오스게이트',
    contentCategoryId: chaosGateId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4500,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.iceBreathId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 6000,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '1640 세베크 아툰',
    contentCategoryId: fieldBossId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 40,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 120,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 12,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 2500,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '1680 세베크 아툰',
    contentCategoryId: fieldBossId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 120,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 60,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 180,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            defaultAverageQuantity: 16,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            defaultAverageQuantity: 2500,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 1,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 7000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 3000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 210,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 420,
            isSellable: false,
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
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 2,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 14500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 270,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 540,
            isSellable: false,
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
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 1,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 6000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 2700,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 200,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 400,
            isSellable: false,
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
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 2,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 12500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 3800,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 260,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 520,
            isSellable: false,
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
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 1,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 7500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 3600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 480,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 960,
            isSellable: false,
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
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 2,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 15500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4400,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 580,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1160,
            isSellable: false,
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
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 1,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 8500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 540,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1080,
            isSellable: false,
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
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 2,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 16500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 640,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1280,
            isSellable: false,
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
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 1,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 9000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4200,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 680,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1320,
            isSellable: false,
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
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 2,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 18500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 5400,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 660,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1320,
            isSellable: false,
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
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 1,
    contentCategoryId: kazerosRaidId,
    level: 1690,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 10000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 4600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 640,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1280,
            isSellable: false,
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
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 2,
    contentCategoryId: kazerosRaidId,
    level: 1690,
    contentDuration: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            defaultAverageQuantity: 20500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            defaultAverageQuantity: 6000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            defaultAverageQuantity: 700,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            defaultAverageQuantity: 1400,
            isSellable: false,
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
  },
];
