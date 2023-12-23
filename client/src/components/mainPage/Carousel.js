// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const Wrapper = styled.div`
//   overflow: hidden;
//   position: relative;
// `;

// const ContentBox = styled.div`
//   display: flex;
//   transition: all 0.3s ease-out;
//   > * {
//     width: 31.3%;
//     flex-shrink: 0;
//     flex-grow: 1;
//     border-radius: 5%;
//     margin-left: 2%;
//   }
// `;

// const TitleWithButton = styled.div`
//   display: flex;
//   justify-content: space-between;
//   .buttom-wrapper {
//     width: 10%;
//     display: flex;
//   }
// `;

// const LeftButton =
//   styled.button <
//   { curIndex: number } >
//   `
//   width: 50%;
//   height: 100%;
//   border-radius: 50%;
//   background-color: yellow;
//   border: 1px solid black;
//   visibility: ${(props) => props.curIndex <= 0 && "hidden"};
// `;

// const RightButton =
//   styled.button <
//   { curIndex: number, totalLength: number } >
//   `
//   width: 50%;
//   height: 100%;
//   border-radius: 50%;
//   background-color: yellow;
//   border: 1px solid black;
//   visibility: ${(props) => props.curIndex >= props.totalLength - 3 && "hidden"};
// `;

// const Carousel = ({ data }) => {
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [length, setLength] = useState(data.length);

//   const next = () => {
//     if (currentIndex < length - 3) {
//       setCurrentIndex((prevState) => prevState + 1);
//     }
//   };

//   const prev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prevState) => prevState - 1);
//     }
//   };

//   return (
//     <Wrapper>
//       <TitleWithButton>
//         <h1>Recommended Videos</h1>
//         <div className="buttom-wrapper">
//           (
//           <LeftButton
//             onClick={prev}
//             className="left-arrow"
//             curIndex={currentIndex}
//           >
//             Left
//           </LeftButton>
//           ) (
//           <RightButton
//             onClick={next}
//             className="right-arrow"
//             curIndex={currentIndex}
//             totalLength={length}
//           >
//             Right
//           </RightButton>
//           )
//         </div>
//       </TitleWithButton>
//       <ContentBox style={{ transform: `translateX(-${currentIndex * 33.3}%)` }}>
//         {data.map((Thumnail, idx) => {
//           return <img key={idx} src={Thumnail.url} alt="" />;
//         })}
//       </ContentBox>
//     </Wrapper>
//   );
// };

// export default Carousel;
