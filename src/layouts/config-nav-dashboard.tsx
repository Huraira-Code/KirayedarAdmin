import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Transactions',
    path: '/transaction',
    icon: icon('ic-user'),
  },
  {
    title: 'Property',
    path: '/property',
    icon: icon('ic-user'),
  },
  {
    title: 'Chat',
    path: '/chat',
    icon: icon('ic-user'),
  },
  // {
  //   title: 'Disputed Chats',
  //   path: '/products',
  //   icon: icon('ic-cart'),
    
  // },
 
];
