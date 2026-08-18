export const Routes = {
  Home: '/',
  About: '/about',
  News: '/news',
  Docs: '/docs',
  Donations: '/donations',
  Church: '/church',
  Leaders: '/leaders',
  Leader: (slug: string) => `/leaders/${slug}`,
};
