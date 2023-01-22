import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className='sticky-footer bg-secondary'>
      <div className='container my-auto'>
        <div className='copyright text-center my-auto text-white'>
          <span>{t('footer')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
