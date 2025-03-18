import React from 'react';
import monkLogo from '../../assets/images/monk.svg';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between bg-cream-light px-8 py-1 border-b border-cream-dark">
      <div className="flex items-center justify-start space-x-2">
        <img src={monkLogo} alt="monk logo" className='border border-gray-light rounded-lg' />
        <h1 className='text-gray-lighter font-normal text-sm'>Monk Upsell & Cross-sell</h1>
      </div>
    </header>
  );
};

export default Header;