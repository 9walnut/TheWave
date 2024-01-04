import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";

const UploadThumbnail = ({ onFileChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // console.log("Selected File1:", file); //찍힘

    // handleUpload(file);
  };
  // useEffect(() => {
  //   console.log("Selected File3:", selectedFile); //찍힘
  // onFileChange(selectedFile);
  // }, [selectedFile, onFileChange]);

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", selectedFile);

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

  useEffect(() => {
    // console.log("Selected File3:", selectedFile);
  }, [selectedFile]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <AdminButtonGrey onClick={handleUpload}>
        썸네일 업로드하기
      </AdminButtonGrey>

      {thumbnailUrl && (
        <div>
          <p>썸네일 미리보기:</p>
          <img
            src={thumbnailUrl}
            alt="Thumbnail"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadThumbnail;
