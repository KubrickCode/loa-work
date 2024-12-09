import { Prisma } from '@prisma/client';

export const getContentsWithRewards = ({
  kurzanId,
  guardianRaidId,
  epicRaidId,
  cubeId,
  kazerosRaidId,
  rewardItemIds,
}: {
  kurzanId: number;
  guardianRaidId: number;
  epicRaidId: number;
  cubeId: number;
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
    name: '아게오로스',
    contentCategoryId: guardianRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 180,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 35120,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 12.4,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 96.2,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 286.7,
            isSellable: true,
            userId: 1,
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
        value: 180,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 39046,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 17.6,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 148.4,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 450,
            isSellable: true,
            userId: 1,
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
        value: 300,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 139591,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 14,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            averageQuantity: 9,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            averageQuantity: 4,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            averageQuantity: 4,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
            averageQuantity: 14000,
            isSellable: false,
            userId: 1,
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
        value: 300,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 150322,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 25,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            averageQuantity: 18,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.lavaBreathId,
            averageQuantity: 5,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.iceBreathId,
            averageQuantity: 5,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.cardExpId,
            averageQuantity: 14500,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 1 작전',
    contentCategoryId: kurzanId,
    level: 1640,
    contentDurations: {
      create: {
        value: 180,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 173415,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 21900,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 10.8,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 166.6,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 450.9,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            averageQuantity: 2.7,
            isSellable: true,
            userId: 1,
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
        value: 180,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 188312,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 28907,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 14.3,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 178,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 515,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            averageQuantity: 4.3,
            isSellable: true,
            userId: 1,
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
        value: 180,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.sillingId,
            averageQuantity: 195058,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 32476,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyBreakstoneId,
            averageQuantity: 17.5,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 220.6,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 626.6,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.level1GemId,
            averageQuantity: 4.4,
            isSellable: true,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 7000,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 3000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 210,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 420,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -3100,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 600,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 800,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 14500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 270,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 540,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: epicRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -4900,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 6000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 900,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1800,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 6000,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 2700,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 200,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 400,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -2800,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 3800,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 550,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1100,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 12500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 3800,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 260,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 520,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1640,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -4100,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 5800,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 850,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1700,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 7500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 3600,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 480,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 960,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -3200,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 6500,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 700,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1400,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 15500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4400,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 580,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1160,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1660,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -5300,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 9500,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 1000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 2000,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 8500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 540,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1080,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -3800,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 7000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 800,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1600,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 16500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4600,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 640,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1280,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -5200,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 10500,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 1050,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 2100,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 9000,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4200,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 680,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1320,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -4100,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 7500,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 850,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1700,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 18500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 5400,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 660,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1320,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1680,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -6600,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 11000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 1150,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 2300,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 10000,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 4600,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 640,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1280,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -4500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 8000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 950,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1900,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: false,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: 20500,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 6000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 700,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 1400,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: true,
    contentCategoryId: kazerosRaidId,
    level: 1670,
    contentDurations: {
      create: {
        value: 600,
        userId: 1,
      },
    },
    contentRewards: {
      createMany: {
        data: [
          {
            contentRewardItemId: rewardItemIds.goldId,
            averageQuantity: -7200,
            isSellable: true,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            averageQuantity: 14000,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            averageQuantity: 1400,
            isSellable: false,
            userId: 1,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            averageQuantity: 2800,
            isSellable: false,
            userId: 1,
          },
        ],
      },
    },
  },
];
