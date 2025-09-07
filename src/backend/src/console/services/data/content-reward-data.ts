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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 173415,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 21900,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 10.8,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 166.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 450.9,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 2.7,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 188312,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 28907,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 14.3,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 178,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 515,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 4.3,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 195058,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 32476,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 17.5,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 220.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 626.6,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 4.4,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 35120,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 12.4,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 96.2,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 286.7,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 39046,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 17.6,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 148.4,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 450,
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
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 139591,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 14,
            isSellable: false,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 9,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            averageQuantity: 4,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            averageQuantity: 4,
            isSellable: false,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 14000,
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
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.sillingId,
            averageQuantity: 150322,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 25,
            isSellable: false,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 18,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            averageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            averageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 14500,
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
        value: 60,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 750,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 1380,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyBreakstoneId,
            averageQuantity: 5,
            isSellable: false,
          },
          {
            itemId: itemIds.lavaBreathId,
            averageQuantity: 1,
            isSellable: false,
          },
          {
            itemId: itemIds.iceBreathId,
            averageQuantity: 1,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            averageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.iceBreathId,
            averageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 2,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 2500,
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
        value: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4500,
            isSellable: true,
          },
          {
            itemId: itemIds.lavaBreathId,
            averageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.iceBreathId,
            averageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 3,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 6000,
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
        value: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 40,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 120,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 12,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 2500,
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
        value: 120,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 60,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 180,
            isSellable: true,
          },
          {
            itemId: itemIds.level1GemId,
            averageQuantity: 16,
            isSellable: true,
          },
          {
            itemId: itemIds.cardExpId,
            averageQuantity: 2500,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 7000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 3000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 210,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 420,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 14500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 270,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 540,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 6000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 2700,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 200,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 400,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 12500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 3800,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 260,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 520,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 7500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 3600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 480,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 960,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 15500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4400,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 580,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1160,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 8500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 540,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1080,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 16500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 640,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1280,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 9000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4200,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 680,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1320,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 18500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 5400,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 660,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1320,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 10000,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 4600,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 640,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1280,
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
        value: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            itemId: itemIds.goldId,
            averageQuantity: 20500,
            isSellable: true,
          },
          {
            itemId: itemIds.destinyFragmentId,
            averageQuantity: 6000,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyDestructionId,
            averageQuantity: 700,
            isSellable: false,
          },
          {
            itemId: itemIds.destinyGuardianId,
            averageQuantity: 1400,
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
