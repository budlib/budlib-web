import React from 'react';
import MenuList from './MenuList';
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
