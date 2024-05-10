import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';
import { TbCardsFilled } from 'react-icons/tb';
import { FaStar } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';

const Slideshow = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => goToNextSlide(),
    onSwipedRight: () => goToPrevSlide(),
    trackMouse: true
  });

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length]);

  const truncateTitle = (title, maxLength) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="relative h-[65vh] mt-16 md:h-[35vh]" {...handlers}>
      {data.map((item, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-1000 ${
            index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img src={item.bannerImage} alt={item.title} className="w-full h-full object-cover" />
          <div className={`absolute flex flex-col justify-end bottom-0 left-0 h-[100%] w-[80%] md:w-full p-16 bg-gradient-to-r from-black`}>
            <h2 className="text-[44px] md:text-[24px] font-bold opacity-100">{truncateTitle(item.title, 45)}</h2>
            <p className='flex items-center text-white md:w-[100%]'>
              <span>{item.type}</span>
              <TbCardsFilled className="ml-2" />
              <span className='pl-1'>{item.totalEpisodes}</span>
              <FaStar className="ml-2" />
              <span className='pl-1'>{item.rating/10}</span>
              <FaClock className="ml-2" />
              <span className='pl-1'>{item.duration} min</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;
