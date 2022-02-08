import React from 'react';
import { Link } from 'react-router-dom';

const MenuCard = ({ id, head, url, src }) => {
  return (
    <div className='col-xl-3 col-lg-5'>
      <Link to={url} style={{ textDecoration: 'none' }}>
        <div className='card shadow mb-4'>
          <div className='card-header py-3'>
            <h6 className='m-0 font-weight-bold text-primary'>{head}</h6>
          </div>

          <div className='card-body p-0'>
            <div
              className='pt-0 pb-0'
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + src})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            >
              <div className='pt-0' style={{ height: '250px', width: '250px' }}></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MenuCard;
