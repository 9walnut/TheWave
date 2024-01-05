import styled from "styled-components";

export const ImageUploadWrapper = styled.div`
  width: 750px;
  height: 300px;
  display: flex;
  /* background-color: red; */
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
`;
export const ThumbnailBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  height: 300px;
  width: 300px;
  margin-top: 10px;
  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;
export const DetailImagesBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  height: 300px;
  width: 300px;
  margin-top: 10px;
  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  position: absolute;
`;
export const DetailBox = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  /* height: 300px; */
  width: 400px;
  height: 300px;
  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;
export const DetailBoxes = styled.div`
  /* background-color: #e9eff4; */
  /* border: 0px solid #e0e0e0; */
  box-shadow: 2px 11px 14px -4px #fafbff;
  border-radius: 8px;
  /* height: 300px; */

  padding-top: 21px;
  color: #6e7f8d;
  text-align: center;
  font-weight: 900;
  border: 1px solid #e0e0e0;

  align-items: center;
  justify-content: center;

  overflow: hidden;

  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 362px;
`;

export const FileSelectBtn = styled.button`
  /* position: relative; */
  /* z-index: 2; */

  width: 80px;
  height: 27px;
  background-color: white;
  color: #6e7f8d;
  border: 1px solid #6e7f8d;
  padding: 10px;
  font-size: smaller;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-left: 40px;
  cursor: pointer;

  &:hover {
    background-color: #6e7f8d;
    color: white;
  }
`;
export const EditFileSelectBtn = styled.button`
  width: 80px;
  height: 27px;
  background-color: white;
  color: #6e7f8d;
  border: 1px solid #6e7f8d;
  padding: 10px;
  font-size: smaller;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-left: 9px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #6e7f8d;
    color: white;
  }
`;

export const EditMsgBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  margin-left: 7px;
  box-shadow: 2px 11px 14px -4px #fafbff;
  /* border-radius: 8px;
  border: 1px solid #6e7f8d; */
  color: #6e7f8d;
  /* height: 300px; */
  text-align: left;
  font-weight: 900;
  width: 700px;
  height: 60px;
  /* padding: 4px; */
  /* background-color: red; */
`;

export const FileTypeLeftInput = styled.input`
  /* pointer-events: none; */
  /* position: absolute; */
  /* z-index: 3; */
  opacity: 0;
  position: absolute;
  height: 30px;
  margin-top: 3px;
  margin-left: -72px;
`;

export const FileTypeRightInput = styled.input`
  /* pointer-events: none; */
  opacity: 0;
  position: absolute;
  height: 30px;
  margin-top: 4px;
  right: -138px;
`;
