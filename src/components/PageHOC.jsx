import React from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';
// import { useGlobalContext } from '../context';
import { logo, heroImg, landingImg } from '../assets';
import styles from '../styles';

const PageHOC = (Component, title, description) => () => {
  // const { showAlert } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <div className={styles.hocContainer}>

      <div className={styles.hocContentBox} style={{ backgroundImage: `url(${landingImg})` }}>
        <div
          className='flex font-rajdhani font-bold sm:text-4xl text-2xl text-white items-center cursor-pointer'
          onClick={() => navigate('/')}
        >
          <img
            src={logo}
            alt='Company logo'
            className={`${styles.hocLogo} w-[56px] h-[56px]`}
            width='56'
            height='56'
          />
          <span className=' text-siteViolet'>Blok</span>Troopers
        </div>

        <div className={styles.hocBodyWrapper}>
          <div className='flex flex-row w-full'>
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>

          <p className={`${styles.normalText} my-10`}>{description}</p>

          <Component />
        </div>

      </div>
      <div className='flex flex-1'></div>

      <div className='w-full h-full bg-siteblack opacity-30 absolute'></div>
      <div className={styles.hocVideo}>
        <img
          src={heroImg}
          alt='hero-img'
          className='w-full h-full object-cover'
          srcSet={`${heroImg} 600w, ${heroImg} 1200w, ${heroImg} 1800w`}
          sizes='(max-width: 600px) 100vw, 
                (max-width: 1200px) 80vw, 
                60vw'
          width='1200'
          height='1200'
          loading='eager'
        />
      </div>
    </div>
  );
};

export default PageHOC;
