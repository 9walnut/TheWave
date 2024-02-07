import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBoxStyle";

const UploadThumbnail = ({ onFileChange }) => {
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
    setFileSelectedMessage("😀업로드 버튼을 꼭 눌러주세요😀");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setFileSelectedMessage("✅ 이미지가 선택되지 않았습니다.");
      setFileBasicMessage("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", selectedFile);

      const response = await axios.post(
        "/api/admin/products/add/thumbnail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const thumbnailUrl = response.data.thumbnailUrl;

      setThumbnailUrl(response.data.thumbnailUrl);
      onFileChange(thumbnailUrl);
      setFileSelectedMessage("");
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };

  useEffect(() => {}, [selectedFile]);

  return (
    <>
      <S.ImageUploadWrapper>
        <S.ThumbnailBox>
          {thumbnailUrl ? (
            <div>
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          ) : (
            <>
              <p>{fileBasicMessage}</p>
              <p>{fileSelectedMessage}</p>
            </>
          )}
        </S.ThumbnailBox>
        <S.ImageBtnWrapper>
          <div style={{ position: "relative" }}>
            <S.FileSelectBtn>파일 선택</S.FileSelectBtn>

            <S.FileTypeLeftInput
              type="file"
              onChange={handleFileChange}
            ></S.FileTypeLeftInput>
          </div>
          <AdminButtonGrey onClick={handleUpload}>
            썸네일 업로드
          </AdminButtonGrey>
        </S.ImageBtnWrapper>
      </S.ImageUploadWrapper>
    </>
  );
};

export default UploadThumbnail;
