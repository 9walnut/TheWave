import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminButtonGrey from "../../../components/adminPage/AdminButtonGrey";
import * as S from "./UploadImageBoxStyle";

const UploadDetail = ({ onFileChange }) => {
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

    // handleUpload(files);
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
    <>
      <S.ImageUploadWrapper>
        {/* <S.DetailBox /> */}
        <S.DetailBox>
          <p>{fileBasicMessage}</p>
          <p>{fileSelectedMessage}</p>
        </S.DetailBox>
        <S.ImageBtnWrapper>
          <div style={{ position: "relative" }}>
            <S.FileTypeRightInput
              type="file"
              multiple
              onChange={handleFileChange}
            ></S.FileTypeRightInput>
            <S.FileSelectBtn>파일 선택</S.FileSelectBtn>
          </div>
          <AdminButtonGrey onClick={handleUpload}>
            상세사진 업로드
          </AdminButtonGrey>
        </S.ImageBtnWrapper>
      </S.ImageUploadWrapper>

      <div>
        {detailUrls && detailUrls.length > 0 ? (
          <div>
            <div style={{ marginTop: "10px", marginLeft: "20px" }}>
              {detailUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Detail ${index}`}
                    style={{ width: "300px", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UploadDetail;
