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
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 1,
    isSeeMore: false,
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
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -3100,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 4000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 600,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 800,
            isSellable: false,
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
  },
  {
    name: '[노말]폭풍의 지휘관, 베히모스',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -4900,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 6000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 900,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1800,
            isSellable: false,
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
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -2800,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 3800,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 550,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1100,
            isSellable: false,
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
  },
  {
    name: '[하드]붉어진 백야의 나선',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -4100,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 5800,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 850,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1700,
            isSellable: false,
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
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -3200,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 6500,
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
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: false,
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
  },
  {
    name: '[노말]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -5300,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 9500,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 1000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 2000,
            isSellable: false,
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
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -3800,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 7000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 800,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1600,
            isSellable: false,
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
  },
  {
    name: '[노말]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -5200,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 10500,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 1050,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 2100,
            isSellable: false,
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
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -4100,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 7500,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 850,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1700,
            isSellable: false,
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
  },
  {
    name: '[하드]대지를 부수는 업화의 궤적',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -6600,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 11000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 1150,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 2300,
            isSellable: false,
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
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 1,
    isSeeMore: true,
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
            defaultAverageQuantity: -4500,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 8000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 950,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 1900,
            isSellable: false,
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
  },
  {
    name: '[하드]부유하는 악몽의 진혼곡',
    gate: 2,
    isSeeMore: true,
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
            defaultAverageQuantity: -7200,
            isSellable: true,
          },
          {
            contentRewardItemId: rewardItemIds.destinyFragmentId,
            defaultAverageQuantity: 14000,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyDestructionId,
            defaultAverageQuantity: 1400,
            isSellable: false,
          },
          {
            contentRewardItemId: rewardItemIds.destinyGuardianId,
            defaultAverageQuantity: 2800,
            isSellable: false,
          },
        ],
      },
    },
  },
];
