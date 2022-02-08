import React from 'react';
import MenuList from './MenuList';
import MenuCard from './MenuCard';

function Menu() {
  return (
    <div className='row pt-3'>
      {MenuList.map((menuItem) => {
        return <MenuCard key={menuItem['id']} {...menuItem} />;
      })}
    </div>
  );
}

export default Menu;
