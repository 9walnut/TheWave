import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadThumbnail = ({ onFileChange }) => {
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
    if (!file) {
      console.log("이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", file);

      console.log("FormData:", formData);

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

      console.log("Thumbnail URL:", thumbnailUrl);

      console.log("이미지 업로드 성공", response.data);
      console.log("Thumbnail URL:", response.data.thumbnailUrl);

      setThumbnailUrl(response.data.thumbnailUrl);
      onFileChange(thumbnailUrl);
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {/* <button onClick={handleUpload}>이미지 업로드</button> */}

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

export default UploadThumbnail;
