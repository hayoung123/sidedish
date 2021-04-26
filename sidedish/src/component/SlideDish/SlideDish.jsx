import React, { useState } from 'react';
import styled from 'styled-components';
import DishItem from 'component/DishItem/DishItem';
import { URL } from 'util/data';
import useFetch from 'hooks/useFetch';
import Carousel from 'component/Carousel/Carousel';

const SlideDish = ({ category }) => {
  const { data: slideData, loading, error } = useFetch({ url: URL[category]() });
  const slideCategory =
    slideData &&
    slideData.body.map((item) => <DishItem key={item.detail_hash} item={item} size="M" />);

  if (error) throw Error(error);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <SlideContainer>
      <Header>모두가 좋아하는 든든한 메인요리</Header>
      <Carousel
        options={{ itemWidth: 324, maxItem: 4, skipItem: 1, animationTime: 0.5, arrow: true }}
        className="carouselWrapper"
      >
        {slideCategory}
      </Carousel>
    </SlideContainer>
  );
};

export default SlideDish;

const SlideContainer = styled.div`
  min-width: 1280px;
  position: relative;
  .carouselWrapper {
    min-width: 1280px;
  }
  .arrow {
    position: absolute;
    font-size: 2rem;
    top: 40%;
  }
  .leftArrow {
    left: -50px;
  }
  .rightArrow {
    right: -50px;
  }
`;

const Header = styled.div`
  color: #333333, 100%;
  font-size: 24px;
  font-weight: bold;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;
