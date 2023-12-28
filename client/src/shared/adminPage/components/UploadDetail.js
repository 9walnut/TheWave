import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadDetail = ({ onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [detailUrls, setDetailUrls] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);

    console.log("Selected Files:", files); //찍힘

    handleUpload(files);
  };
  useEffect(() => {
    console.log("Selected File3:", selectedFiles); //찍힘
    // onFileChange(selectedFile);
  }, [selectedFiles, onFileChange]);

  const handleUpload = async (files) => {
    if (!files) {
      console.log("상세 이미지를 선택하세요."); //찍힘
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("detailUrls", files[i]);
      }

      console.log("FormData:", formData);

      const response = await axios.post(
        "/admin/products/add/detail",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      // 서버 응답에서 detailUrls 추출
      const detailUrls = response.data.detailUrls;
      //--------------------------------

      // 배열을 객체로 변환
      // const detailUrlsArray = response.data.detailUrls;

      // const detailUrlsObject = detailUrlsArray.reduce((acc, url, index) => {
      //   acc[`detailUrl${index + 1}`] = url;
      //   return acc;
      // }, {});

      // console.log(detailUrlsObject);
      //--------------------------------

      console.log("Detail URL 멀로 오니:", detailUrls);
      // console.log("Detail URL detailUrlObject멀로 오니:", detailUrlObject);

      console.log("이미지 업로드 성공", response.data);
      console.log("Detail URL:", response.data.detailUrls);

      // 업로드 성공 후 썸네일 저장
      setDetailUrls(response.data.detailUrls);
      onFileChange(detailUrls);
    } catch (error) {
      console.error("response.data이미지 업로드 실패", error.response.data);
      console.error("response 이미지 업로드 실패", error.response);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} multiple />
      {/* <button onClick={handleUpload}>이미지 업로드</button> */}

      {detailUrls && (
        <div>
          <p>디테일이미지 미리보기:</p>
          {/* <img src={detailUrls} alt="Detail" style={{ maxWidth: "100%" }} /> */}
          {detailUrls.map((url, index) => (
            <div key={index}>
              <img
                src={url}
                alt={`Detail ${index}`}
                style={{ maxWidth: "100%" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadDetail;
