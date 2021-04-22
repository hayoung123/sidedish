import React from 'react';
import styled from 'styled-components';

const Slider = ({ slidePos, slideCategory }) => {
  console.log(slidePos);
  return <SliderWrapper slidePos={slidePos}>{slideCategory}</SliderWrapper>;
};

export default Slider;

const SliderWrapper = styled.div`
  display: flex;
  transform: ${(props) => `translateX(${props.slidePos}`};
  transform: translateX(-640px);
`;
