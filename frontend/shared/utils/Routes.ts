export const Routes = {
  Home: '/',
  About: '/about',
  News: '/news',
  Docs: '/docs',
  Donations: '/donations',
  Church: '/church',
  Leaders: '/leaders',
  Leader: (slug: string) => `/leaders/${slug}`,
  Login: '/login',
  Dashboard: '/dashboard',
  DashboardNews: '/dashboard/news',
  DashboardNewsCreate: '/dashboard/news/new',
};
