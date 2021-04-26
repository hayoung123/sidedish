import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';

const Carousel = ({
  children,
  options: { itemWidth, maxItem, skipItem, animationTime, leftArrowStyle, rightArrowStyle, arrow },
}) => {
  const [locationX, setLocationX] = useState(0);
  const [currIdx, setCurrIdx] = useState(0);
  const [leftItem, setLeftItem] = useState();

  const handleClickPrev = () => {
    const possibleMove = currIdx >= skipItem ? skipItem : currIdx;
    setLocationX(locationX + itemWidth * possibleMove);
    setCurrIdx(currIdx - possibleMove);
    setLeftItem(leftItem + possibleMove);
  };

  const handleClickNext = () => {
    const totalItemCount = children.length;
    const newLeftItem = totalItemCount - (currIdx + maxItem);
    const possibleMove = newLeftItem >= skipItem ? skipItem : newLeftItem;
    setLocationX(locationX - itemWidth * possibleMove);
    setCurrIdx(currIdx + possibleMove);
    setLeftItem(newLeftItem - possibleMove);
  };

  return (
    <StyledCarousel
      locationX={locationX}
      animationTime={animationTime}
      currIdx={currIdx}
      leftItem={leftItem}
    >
      {arrow && (
        <>
          <IoChevronBackSharp
            style={leftArrowStyle}
            onClick={handleClickPrev}
            className="leftArrow arrow"
          />
          <IoChevronForwardSharp
            onClick={handleClickNext}
            className="rightArrow arrow"
            style={rightArrowStyle}
          />
        </>
      )}
      <div className="carouselWrapper">
        <div className="carouselList">{children}</div>
      </div>
    </StyledCarousel>
  );
};

export default Carousel;

const StyledCarousel = styled.div`
  position: relative;

  .carouselWrapper {
    overflow: hidden;
  }
  .carouselList {
    display: flex;
    transition: ${({ animationTime }) => `transform ${animationTime}s`};
    transform: ${({ locationX }) => `translateX(${locationX}px)`};
  }
  .leftArrow {
    opacity: ${({ currIdx }) => (currIdx === 0 ? '0.3' : '1')};
  }
  .leftArrow:hover {
    color: ${({ currIdx }) => currIdx !== 0 && 'red'};
  }
  .rightArrow {
    opacity: ${({ leftItem }) => (leftItem === 0 ? '0.3' : '1')};
  }
  .rightArrow :hover {
    color: ${({ leftItem }) => leftItem !== 0 && 'red'};
  }
`;
