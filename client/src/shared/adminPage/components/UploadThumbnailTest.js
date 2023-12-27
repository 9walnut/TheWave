import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadThumbnailTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    console.log("Selected File:", file); //찍힘
    console.log("Selected File2:", selectedFile); //ㄴㄴ
  };
  useEffect(() => {
    console.log("Selected File3:", selectedFile); //찍힘
    // handleUpload();
  }, [selectedFile]); // selectedFile이 업데이트될 때만 실행

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      formData.append("thumbnailUrl", selectedFile);

      console.log("FormData:", formData);

      const response = await axios.post("/admin/products/thumbnail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("이미지 업로드 성공", response.data);
      console.log("Thumbnail URL:", response.data.thumbnailUrl);

      // 업로드 성공 후 썸네일 URL을 상태에 저장
      setThumbnailUrl(response.data.thumbnailUrl);
    } catch (error) {
      console.error("이미지 업로드 실패", error.response.data);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>이미지 업로드</button>

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

export default UploadThumbnailTest;
