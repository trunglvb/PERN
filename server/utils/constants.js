const EnumPricing = ['Thường', 'Đồng', 'Vàng', 'Bạc', 'Kim cương'];
const EnumPostStatus = ['Còn trống', 'Đang đàn phám', 'Đã bàn giao'];
const EnumPropertyTypes = [
  'Căn hộ chung cư',
  'Nhà mặt phố',
  'Nhà riêng',
  'Nhà phố thương mại',
  'Biệt thự',
  'Đất nền',
  'Bán đất',
  'Trang trại',
  'Khu nghỉ dưỡng',
  'Kho',
  'Nhà xưởng',
  'Khác'
];
const EnumListingType = ['Bán', 'Cho thuê'];
const EnumDirection = ['Đông - Bắc', 'Tây - Nam', 'Đông - Nam', 'Tây - Bắc', 'Đông', 'Tây', 'Nam', 'Bắc'];

const pricings = [
  {
    name: 'Thường',
    isDisplayImmedialy: false,
    levelShowDescription: 0.1,
    priority: 1,
    requireScore: 0,
    requireScoreNextLevel: 200000,
    expiredDay: 1,
    price: 0,
    imageUrl: 'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063381/base_ocbbrm.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Đồng',
    isDisplayImmedialy: false,
    levelShowDescription: 0.2,
    priority: 2,
    requireScore: 200000,
    requireScoreNextLevel: 500000,
    expiredDay: 3,
    price: 200000,
    imageUrl: 'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063467/bronze_isaljz.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Bạc',
    isDisplayImmedialy: true,
    levelShowDescription: 0.3,
    priority: 3,
    requireScore: 500000,
    requireScoreNextLevel: 1000000,
    expiredDay: 7,
    price: 500000,
    imageUrl: 'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063497/silver_vram0w.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Vàng',
    isDisplayImmedialy: true,
    levelShowDescription: 0.4,
    priority: 4,
    requireScore: 1000000,
    requireScoreNextLevel: 2000000,
    expiredDay: 10,
    price: 1000000,
    imageUrl: 'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063523/gold_vq8oxm.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Kim cương',
    isDisplayImmedialy: true,
    levelShowDescription: 0.5,
    priority: 5,
    requireScore: 2000000,
    requireScoreNextLevel: 0,
    expiredDay: 10,
    price: 2000000,
    imageUrl: 'https://res.cloudinary.com/dmyjgrs7b/image/upload/v1734063565/dinamond_gfkap1.svg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

module.exports = { EnumPricing, EnumPostStatus, EnumPropertyTypes, EnumListingType, EnumDirection, pricings };
