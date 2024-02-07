import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBoxStyle";

const UploadDetailEdit = ({ onFileChange, productId }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [detailUrls, setDetailUrls] = useState(null);
  const [fileSelectedMessage, setFileSelectedMessage] = useState("");
  const [fileBasicMessage, setFileBasicMessage] = useState(
    "여러장일 경우 일괄 선택 해주세요."
  );

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
    setFileBasicMessage("");
    setFileSelectedMessage("😀업로드 버튼을 꼭 눌러주세요😀");
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      setFileSelectedMessage("이미지가 선택되지 않았습니다.");
      setFileBasicMessage("");
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("detailUrls", selectedFiles[i]);
      }

      const response = await axios.patch(
        `/api/admin/products/${productId}/edit/detail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      const detailUrls = response.data.detailUrls;

      // console.log("Detail URL: ", detailUrls);
      // console.log("detailUrlObject: ", detailUrlObject);

      console.log("이미지 업로드 성공", response.data);
      console.log("Detail URL:", response.data.detailUrls);

      // 업로드 성공 후 썸네일 저장
      setDetailUrls(response.data.detailUrls);
      onFileChange(detailUrls);
      setFileSelectedMessage("😀아래에서 상세 이미지를 확인해보세요😀");
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };
  useEffect(() => {
    // console.log("Selected File3:", selectedFiles);
  }, [selectedFiles]);

  return (
    <S.ImageBtnWrapper>
      <div style={{ position: "relative" }}>
        <S.EditFileSelectBtn>파일 선택</S.EditFileSelectBtn>

        <S.FileTypeLeftInput
          type="file"
          onChange={handleFileChange}
          multiple
        ></S.FileTypeLeftInput>
      </div>
      <AdminButtonGrey onClick={handleUpload}>상세이미지 수정</AdminButtonGrey>
      <S.EditMsgBox>
        <p>{fileBasicMessage}</p>
        <p>{fileSelectedMessage}</p>
      </S.EditMsgBox>
    </S.ImageBtnWrapper>
  );
};

export default UploadDetailEdit;
