export default defineAppConfig({
  pages: [
    'pages/finance/index',
    'pages/guest/index',
    'pages/copywriting/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#3B4C7D',
    navigationBarTitleText: 'OPC 超级个体学院',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1B3A6B',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/finance/index',
        text: '企业AI',
        iconPath: './assets/tabbar/trending-up.png',
        selectedIconPath: './assets/tabbar/trending-up-active.png'
      },
      {
        pagePath: 'pages/guest/index',
        text: '个体AI',
        iconPath: './assets/tabbar/users.png',
        selectedIconPath: './assets/tabbar/users-active.png'
      },
      {
        pagePath: 'pages/copywriting/index',
        text: '文案库',
        iconPath: './assets/tabbar/users.png',
        selectedIconPath: './assets/tabbar/users-active.png'
      }
    ]
  }
})
