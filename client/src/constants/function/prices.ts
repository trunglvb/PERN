interface PriceRange {
  id: number;
  label: string;
  value: string;
}

interface SizeRange {
  id: number;
  label: string;
  value: string;
}

export const prices: PriceRange[] = [
  {
    id: -1,
    label: 'Tất cả mức giá',
    value: 'ALL'
  },
  {
    id: 1,
    label: 'Dưới 500 triệu',
    value: JSON.stringify([0, 0.5 * Math.pow(10, 3)])
  },
  {
    id: 2,
    label: '500 - 800 triệu',
    value: JSON.stringify([0.5 * Math.pow(10, 3), 0.8 * Math.pow(10, 3)])
  },
  {
    id: 3,
    label: '800 - 1 tỷ',
    value: JSON.stringify([0.8 * Math.pow(10, 3), 1 * Math.pow(10, 3)])
  },
  {
    id: 4,
    label: '1 - 2 tỷ',
    value: JSON.stringify([1 * Math.pow(10, 3), 2 * Math.pow(10, 3)])
  },
  {
    id: 5,
    label: '2 - 3 tỷ',
    value: JSON.stringify([2 * Math.pow(10, 3), 3 * Math.pow(10, 3)])
  },
  {
    id: 6,
    label: '3 - 5 tỷ',
    value: JSON.stringify([3 * Math.pow(10, 3), 5 * Math.pow(10, 3)])
  },
  {
    id: 7,
    label: '5 - 7 tỷ',
    value: JSON.stringify([5 * Math.pow(10, 3), 7 * Math.pow(10, 3)])
  },
  {
    id: 8,
    label: '7 - 10 tỷ',
    value: JSON.stringify([7 * Math.pow(10, 3), 10 * Math.pow(10, 3)])
  },
  {
    id: 50,
    label: 'Trên 10 tỷ',
    value: JSON.stringify([10 * Math.pow(10, 3), 10 * Math.pow(10, 3)])
  }
];

export const sizes: SizeRange[] = [
  {
    id: -1,
    label: 'Tất cả diện tích',
    value: 'ALL'
  },
  {
    id: 1,
    label: 'Dưới 30 m²',
    value: JSON.stringify([0, 30])
  },
  {
    id: 2,
    label: '30 - 50 m²',
    value: JSON.stringify([30, 50])
  },
  {
    id: 3,
    label: '50 - 80 m²',
    value: JSON.stringify([50, 80])
  },
  {
    id: 4,
    label: '80 - 100 m²',
    value: JSON.stringify([80, 100])
  },
  {
    id: 5,
    label: '100 - 150 m²',
    value: JSON.stringify([100, 150])
  },
  {
    id: 6,
    label: '150 - 200 m²',
    value: JSON.stringify([150, 200])
  },
  {
    id: 7,
    label: '200 - 250 m²',
    value: JSON.stringify([200, 250])
  },
  {
    id: 8,
    label: '250 - 300 m²',
    value: JSON.stringify([250, 300])
  },
  {
    id: 9,
    label: 'Trên 500 m²',
    value: JSON.stringify([500, 500])
  }
];

export const rangePriceForFilter = {
  min: 0,
  max: 1000
};
