import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";

const UploadDetail = ({ onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [detailUrls, setDetailUrls] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

    // console.log("Selected Files:", files); //찍힘

    // handleUpload(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      console.log("상세 이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("detailUrls", selectedFiles[i]);
      }

      console.log("FormData:", formData);

      const response = await axios.post(
        "/api/admin/products/add/detail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      const detailUrls = response.data.detailUrls;

      // console.log("Detail URL 멀로 오니:", detailUrls);
      // console.log("Detail URL detailUrlObject멀로 오니:", detailUrlObject);

      console.log("이미지 업로드 성공", response.data);
      console.log("Detail URL:", response.data.detailUrls);

      // 업로드 성공 후 썸네일 저장
      setDetailUrls(response.data.detailUrls);
      onFileChange(detailUrls);
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error);
      console.error("response 이미지 업로드 실패", error);
    }
  };
  useEffect(() => {
    // console.log("Selected File3:", selectedFiles);
  }, [selectedFiles]);
  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      <AdminButtonGrey onClick={handleUpload}>
        상세이미지 업로드하기
      </AdminButtonGrey>

      {detailUrls && (
        <div>
          <p>디테일이미지 미리보기:</p>
          {/* <img src={detailUrls} alt="Detail" style={{ maxWidth: "100%" }} /> */}
          {detailUrls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Detail ${index}`}
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadDetail;
