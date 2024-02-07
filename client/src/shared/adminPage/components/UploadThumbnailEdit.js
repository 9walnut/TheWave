import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBoxStyle";

const UploadThumbnailEdit = ({ onFileChange, productId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [fileSelectedMessage, setFileSelectedMessage] = useState("");
  const [fileBasicMessage, setFileBasicMessage] = useState(
    "썸네일은 한 장만 선택 가능합니다."
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileBasicMessage("");
    setFileSelectedMessage("😀썸네일 수정 버튼을 꼭 눌러주세요😀");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setFileSelectedMessage(
        "✅ 이미지가 선택되지 않았습니다. 미 선택 시 기존 이미지가 업로드 됩니다."
      );
      setFileBasicMessage("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", selectedFile);

      const response = await axios.patch(
        `/api/admin/products/${productId}/edit/thumbnail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const thumbnailUrl = response.data.thumbnailUrl;

      setThumbnailUrl(response.data.thumbnailUrl);
      onFileChange(response.data.thumbnailUrl);
      setFileSelectedMessage("");
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };

  useEffect(() => {
    if (thumbnailUrl) {
      onFileChange(thumbnailUrl);
    }
  }, [thumbnailUrl, onFileChange]);
  return (
    <S.ImageBtnWrapper>
      <div style={{ position: "relative" }}>
        <S.EditFileSelectBtn>파일 선택</S.EditFileSelectBtn>

        <S.FileTypeLeftInput
          type="file"
          onChange={handleFileChange}
        ></S.FileTypeLeftInput>
      </div>
      <AdminButtonGrey onClick={handleUpload}>썸네일 수정</AdminButtonGrey>
      <S.EditMsgBox>
        <p>{fileBasicMessage}</p>
        <p>{fileSelectedMessage}</p>
      </S.EditMsgBox>
    </S.ImageBtnWrapper>
  );
};

export default UploadThumbnailEdit;
