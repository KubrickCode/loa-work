import { Prisma } from '@prisma/client';

export const getContentsWithRewards = ({
  kurzanId,
  guardianRaidId,
  cubeId,
  chaosGateId,
  epicRaidId,
  kazerosRaidId,
  rewardItemIds,
}: {
  kurzanId: number;
  guardianRaidId: number;
  cubeId: number;
  chaosGateId: number;
  epicRaidId: number;
  kazerosRaidId: number;
  rewardItemIds: {
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 173415,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 21900,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 10.8,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 166.6,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 450.9,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 188312,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 28907,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 14.3,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 178,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 515,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 195058,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 32476,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 17.5,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 220.6,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 626.6,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 35120,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 12.4,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 96.2,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 39046,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 17.6,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 148.4,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 139591,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 14,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            defaultAverageQuantity: 9,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            defaultAverageQuantity: 4,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            defaultAverageQuantity: 4,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
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
    contentDurations: {
      create: {
        defaultValue: 300,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            defaultAverageQuantity: 150322,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            defaultAverageQuantity: 25,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            defaultAverageQuantity: 18,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            defaultAverageQuantity: 5,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            defaultAverageQuantity: 5,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
            defaultAverageQuantity: 14500,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            defaultAverageQuantity: 2,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
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
    contentDurations: {
      create: {
        defaultValue: 180,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            defaultAverageQuantity: 3,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
            defaultAverageQuantity: 6000,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 7000,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 3000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 210,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -3100,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 4000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 600,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 14500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 270,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -4900,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 6000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 900,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 6000,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 2700,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 200,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -2800,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 3800,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 550,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 12500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 3800,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 260,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -4100,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 5800,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 850,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 7500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 3600,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 480,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -3200,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 6500,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 700,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 15500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4400,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 580,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -5300,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 9500,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 1000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 8500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 540,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -3800,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 7000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 800,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 16500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4600,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 640,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -5200,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 10500,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 1050,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 9000,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4200,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 680,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -4100,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 7500,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 850,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 18500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 5400,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 660,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -6600,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 11000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 1150,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    level: 1670,
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 10000,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4600,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 640,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -4500,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 8000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 950,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
    level: 1670,
    contentDurations: {
      create: {
        defaultValue: 600,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            defaultAverageQuantity: 20500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 6000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 700,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
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
            contentRewardItemId: rewardItemIds.goldId,
            quantity: -7200,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            quantity: 14000,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            quantity: 1400,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            quantity: 2800,
          },
        ],
      },
    },
  },
];
