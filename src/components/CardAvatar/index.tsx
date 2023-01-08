import { useState, createElement } from 'react';

import GroupIcon from '@mui/icons-material/Group';
import EastIcon from '@mui/icons-material/East';
import KeyIcon from '@mui/icons-material/Key';
import PolicyIcon from '@mui/icons-material/Policy';
import WestIcon from '@mui/icons-material/West';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';

export interface CardAvatarProps {
  icon: 'GroupIcon' | 'EastIcon' | 'KeyIcon' | 'PolicyIcon' | 'WestIcon' | 'ArticleIcon' | 'PersonIcon' | 'HighLine' | 'LowLine' | 'Clock';
  title: string;
  subtitle?: string;
  counter: number;
  color: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'teal' | 'yellow';
}

export default function CardAvatar({ icon, counter, title, subtitle, color }: CardAvatarProps) {

  const [icons] = useState({
    GroupIcon,
    EastIcon,
    KeyIcon,
    PolicyIcon,
    WestIcon,
    ArticleIcon,
    PersonIcon,
    HighLine: () => <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    LowLine: () => <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
    </svg>,
    Clock: () => <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  });

  return (
    <div className="flex items-center p-8 bg-white shadow rounded-lg">
      <div className={`inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-${color}-600 bg-${color}-100 rounded-full mr-6`}>
        {createElement(icons[icon])}
      </div>
      <div>
        <span className="inline-block text-2xl font-bold">{counter}</span>
        {subtitle && <span className="inline-block text-xl text-gray-500 font-semibold ml-2">({subtitle})</span>}
        <span className="block text-gray-500">{title}</span>
      </div>
    </div>
  );
}