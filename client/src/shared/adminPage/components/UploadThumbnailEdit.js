import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadThumbnailEdit = ({ onFileChange, productId }) => {
  console.log(productId);

  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    console.log("Selected File1:", file); //찍힘

    handleUpload(file);
  };
  useEffect(() => {
    console.log("Selected File3:", selectedFile); //찍힘
    // onFileChange(selectedFile);
  }, [selectedFile, onFileChange]);

  const handleUpload = async (file) => {
    console.log(productId);

    if (!file) {
      console.log("이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", file);
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
      <br />
      <br />
      <p>✅썸네일 수정하기 (사진 재선택)</p>
      <input type="file" onChange={handleFileChange} />

      {thumbnailUrl && (
        <div>
          <p>썸네일 미리보기:</p>
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadThumbnailEdit;
