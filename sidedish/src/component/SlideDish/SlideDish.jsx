import React, { useState } from 'react';
import styled from 'styled-components';
import DishItem from 'component/DishItem/DishItem';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import { URL } from 'util/data';
import useFetch from 'hooks/useFetch';

const SlideDish = ({ category }) => {
  const { data: slideData, loading } = useFetch(URL[category]());
  const slideCategory =
    slideData &&
    slideData.body.map((item) => <DishItem key={item.detail_hash} item={item} size="M" />);
  const [slidePos, setSlidePos] = useState(0);
  const [contentsCnt, setContentsCnt] = useState(4);
  const itemSize = 324;

  const handleRightClick = () => {
    if (slidePos > -(itemSize * contentsCnt)) setSlidePos(slidePos - itemSize * contentsCnt);
  };
  const handleLeftClick = () => {
    if (slidePos) setSlidePos(slidePos + itemSize * contentsCnt);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <SlideContainer>
      <Header>모두가 좋아하는 든든한 메인요리</Header>
      <SlideWrapper>
        <IoChevronBackSharp className="leftArrow" onClick={handleLeftClick} />
        <StyledSlideList>
          <Slide slidePos={slidePos}>{slideCategory}</Slide>
        </StyledSlideList>
        <IoChevronForwardSharp className="rightArrow" onClick={handleRightClick} />
      </SlideWrapper>
    </SlideContainer>
  );
};

export default SlideDish;

const Slide = styled.div`
  display: flex;
  transform: ${(props) => `translateX(${props.slidePos}px)`};
`;

const SlideContainer = styled.div`
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .leftArrow {
    position: absolute;
    left: -2rem;
    top: 50%;
    width: 18px;
    height: 18px;
  }

  .rightArrow {
    position: absolute;
    left: 101%;
    top: 50%;
    width: 18px;
    height: 18px;
  }
`;

const Header = styled.div`
  color: #333333, 100%;
  font-size: 24px;
  font-weight: bold;
  margin-top: 5rem;
  margin-bottom: 2rem;
`;

const StyledSlideList = styled.div`
  display: flex;
  min-width: 1280px;
  overflow: hidden;
`;
