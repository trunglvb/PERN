const path = {
  auth: {
    login: '/login'
  },
  publics: {
    home: '/',
    news: '/tin-tuc',
    rentProperty: '/nha-cho-thue',
    soldProperty: '/nha-ban'
  },
  users: {
    general: '/thanh-vien/tong-quan',
    createPost: '/thanh-vien/tao-tin',
    managerPost: '/thanh-vien/danh-sach-tin',
    draftPost: '/thanh-vien/tin-nhap',
    updateAccount: '/thanh-vien/cap-nhat-thong-tin',
    managerFinance: '/thanh-vien/quan-ly-tai-chinh',
    deposit: '/thanh-vien/nap-tien',
    paymentHistory: '/thanh-vien/lich-su-giao-dich'
  }
} as const;

export default path;
