import React from 'react';

import MenuCard from './MenuCard';
import DashboardMenuList from './DashboardMenuList';

function DashboardMenu() {
  return (
    <div className='row pt-3'>
      {DashboardMenuList.map((menuItem) => {
        return <MenuCard key={menuItem['id']} {...menuItem} />;
      })}
    </div>
  );
}

export default DashboardMenu;
