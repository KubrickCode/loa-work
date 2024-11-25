import { ContentType, Prisma } from '@prisma/client';

export const contentsWithRewards: Prisma.ContentUncheckedCreateInput[] = [
  {
    name: '아게오로스',
    type: ContentType.GUARDIAN_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 35120, isSellable: false },
          {
            itemName: '운명의 돌파석',
            averageQuantity: 12.4,
            isSellable: true,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 96.2,
            isSellable: true,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 286.7,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '스콜라키아',
    type: ContentType.GUARDIAN_RAID,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 39046, isSellable: false },
          {
            itemName: '운명의 돌파석',
            averageQuantity: 17.6,
            isSellable: true,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 148.4,
            isSellable: true,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 450,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '제 1 해금',
    type: ContentType.CUBE,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 139591, isSellable: false },
          { itemName: '운명의 돌파석', averageQuantity: 14, isSellable: false },
          { itemName: '1레벨 보석', averageQuantity: 9, isSellable: true },
          { itemName: '용암의 숨결', averageQuantity: 4, isSellable: false },
          { itemName: '빙하의 숨결', averageQuantity: 4, isSellable: false },
          {
            itemName: '카드 경험치',
            averageQuantity: 14000,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '제 2 해금',
    type: ContentType.CUBE,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 150322, isSellable: false },
          { itemName: '운명의 돌파석', averageQuantity: 25, isSellable: false },
          { itemName: '1레벨 보석', averageQuantity: 18, isSellable: true },
          { itemName: '용암의 숨결', averageQuantity: 5, isSellable: false },
          { itemName: '빙하의 숨결', averageQuantity: 5, isSellable: false },
          {
            itemName: '카드 경험치',
            averageQuantity: 14500,
            isSellable: false,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 1 작전',
    type: ContentType.KURZAN_FRONT,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 173415, isSellable: false },
          {
            itemName: '운명의 파편',
            averageQuantity: 21900,
            isSellable: false,
          },
          {
            itemName: '운명의 돌파석',
            averageQuantity: 10.8,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 166.6,
            isSellable: true,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 450.9,
            isSellable: true,
          },
          {
            itemName: '1레벨 보석',
            averageQuantity: 2.7,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 2 작전',
    type: ContentType.KURZAN_FRONT,
    level: 1660,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 188312, isSellable: false },
          {
            itemName: '운명의 파편',
            averageQuantity: 28907,
            isSellable: false,
          },
          {
            itemName: '운명의 돌파석',
            averageQuantity: 14.3,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 178,
            isSellable: true,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 515,
            isSellable: true,
          },
          {
            itemName: '1레벨 보석',
            averageQuantity: 4.3,
            isSellable: true,
          },
        ],
      },
    },
  },
  {
    name: '아비도스 3 작전',
    type: ContentType.KURZAN_FRONT,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '실링', averageQuantity: 195058, isSellable: false },
          {
            itemName: '운명의 파편',
            averageQuantity: 32476,
            isSellable: false,
          },
          {
            itemName: '운명의 돌파석',
            averageQuantity: 17.5,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 220.6,
            isSellable: true,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 626.6,
            isSellable: true,
          },
          {
            itemName: '1레벨 보석',
            averageQuantity: 4.4,
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
    type: ContentType.EPIC_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 7000, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 3000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 210,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 420,
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
    type: ContentType.EPIC_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -3100, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 600,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 800,
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
    type: ContentType.EPIC_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 14500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 270,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 540,
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
    type: ContentType.EPIC_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -4900, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 6000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 900,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1800,
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
    type: ContentType.KAZEROS_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 6000, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 2700, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 200,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 400,
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
    type: ContentType.KAZEROS_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -2800, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 3800, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 550,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1100,
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
    type: ContentType.KAZEROS_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 12500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 3800, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 260,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 520,
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
    type: ContentType.KAZEROS_RAID,
    level: 1640,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -4100, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 5800, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 850,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1700,
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
    type: ContentType.KAZEROS_RAID,
    level: 1660,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 7500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 3600, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 480,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 960,
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
    type: ContentType.KAZEROS_RAID,
    level: 1660,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -3200, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 6500, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 700,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1400,
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
    type: ContentType.KAZEROS_RAID,
    level: 1660,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 15500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4400, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 580,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1160,
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
    type: ContentType.KAZEROS_RAID,
    level: 1660,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -5300, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 9500, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 1000,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 2000,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 8500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 540,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1080,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -3800, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 7000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 800,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1600,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 16500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4600, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 640,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1280,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -5200, isSellable: true },
          {
            itemName: '운명의 파편',
            averageQuantity: 10500,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 1050,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 2100,
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
    type: ContentType.KAZEROS_RAID,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 9000, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4200, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 680,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1320,
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
    type: ContentType.KAZEROS_RAID,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -4100, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 7500, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 850,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1700,
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
    type: ContentType.KAZEROS_RAID,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 18500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 5400, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 660,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1320,
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
    type: ContentType.KAZEROS_RAID,
    level: 1680,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -6600, isSellable: true },
          {
            itemName: '운명의 파편',
            averageQuantity: 11000,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 1150,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 2300,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 10000, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 4600, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 640,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1280,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -4500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 8000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 950,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1900,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: 20500, isSellable: true },
          { itemName: '운명의 파편', averageQuantity: 6000, isSellable: false },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 700,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 1400,
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
    type: ContentType.KAZEROS_RAID,
    level: 1670,
    contentRewards: {
      createMany: {
        data: [
          { itemName: '골드', averageQuantity: -7200, isSellable: true },
          {
            itemName: '운명의 파편',
            averageQuantity: 14000,
            isSellable: false,
          },
          {
            itemName: '운명의 파괴석',
            averageQuantity: 1400,
            isSellable: false,
          },
          {
            itemName: '운명의 수호석',
            averageQuantity: 2800,
            isSellable: false,
          },
        ],
      },
    },
  },
];
