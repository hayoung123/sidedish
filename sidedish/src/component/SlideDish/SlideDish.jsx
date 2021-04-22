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

  const handleRightClick = () => {
    console.log('right');
    setSlidePos(slidePos + 324);
  };
  const handleLeftClick = () => {
    console.log('left');
    setSlidePos(slidePos - 324);
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <SlideContainer>
      <Header>모두가 좋아하는 든든한 메인요리</Header>
      <StyledSlideList>
        <Slide slidePos={slidePos}>{slideCategory}</Slide>
      </StyledSlideList>
      <SlideArrow>
        <IoChevronBackSharp className="leftArrow" onClick={handleLeftClick} />
        <IoChevronForwardSharp className="rightArrow" onClick={handleRightClick} />
      </SlideArrow>
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
  position: relative;
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

const SlideArrow = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: -4%;
  width: 108%;
  height: 100%;
  font-size: 1.2rem;
  /* z-index: -1; */
  .leftArrow {
    //속성으로 색깔비교
  }
  .rightArrow {
    //속성으로 색깔비교
  }
`;
