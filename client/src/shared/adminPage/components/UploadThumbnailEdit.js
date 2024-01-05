import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBox";

const UploadThumbnailEdit = ({ onFileChange, productId }) => {
  // console.log(productId);

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
    // console.log("Selected File1:", file); //찍힘

    // handleUpload(file);
  };
  // useEffect(() => {
  //   console.log("Selected File3:", selectedFile); //찍힘
  // onFileChange(selectedFile);
  // }, [selectedFile, onFileChange]);

  const handleUpload = async () => {
    // console.log(productId);

    if (!selectedFile) {
      console.log("이미지를 선택하세요."); //찍힘
      setFileSelectedMessage(
        "✅ 이미지가 선택되지 않았습니다. 미 선택 시 기존 이미지가 업로드 됩니다."
      );
      setFileBasicMessage("");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", selectedFile);
      // formData.append("productId", productId);

      console.log("FormData:", formData);

      //컨트롤러에서 productId req.params로 받도록 하면 productId 찍힘
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

      console.log("Thumbnail URL:", thumbnailUrl);

      console.log("이미지 업로드 성공", response.data);
      console.log("Thumbnail URL:", response.data.thumbnailUrl);

      setThumbnailUrl(response.data.thumbnailUrl);
      // onFileChange(thumbnailUrl);
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
    <div>
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
      {/* <input type="file" onChange={handleFileChange} /> */}
      {/* <button onClick={handleUpload}>썸네일 수정🌀</button> */}
    </div>
  );
};

export default UploadThumbnailEdit;
