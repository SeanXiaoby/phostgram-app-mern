import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { serverInfo } from "../data/serverInfo";

const CreateBox = () => {
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [EncodedImg, setEncodedImg] = useState(null);
  const [Submitted, setSubmitted] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ImageUrl, setImageUrl] = useState(null);
  const [Status, setStatus] = useState({ success: false, message: "" });

  const navigate = useNavigate();

  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setEncodedImg(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const res = await fetch(serverInfo.url + "/api/uploadImg", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const { img_url } = await res.json();
        setImageUrl(img_url === undefined ? null : img_url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkInput = (ImgString, text) => {
    if (ImgString === null || ImgString === undefined) {
      return { success: false, message: "Please upload a photo..." };
    }

    if (text === "") {
      return { success: false, message: "Please write a caption..." };
    }

    return { success: true, message: "" };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewImg(file);

    setImageUploaded(true);
  };

  const handleSubmitPhost = async () => {
    setSubmitted(true);
    setLoading(true);
    const text = document.getElementById("create-text").value;

    const check = checkInput(EncodedImg, text);

    if (check.success === false) {
      setStatus({ success: false, message: check.message });
      setLoading(false);
      return;
    }

    await uploadImage(EncodedImg);

    const data = {
      img: ImageUrl,
      text: text,
      author_id: localStorage.getItem("user_id"),
    };

    try {
      const res = await fetch(serverInfo.url + "/api/create", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        const { phost_id } = await res.json();
        setStatus({ success: true, message: "Phosted!" });
        setLoading(false);
        navigate(`/phost/${phost_id}`);
      } else {
        setStatus({
          success: false,
          message: "Something went wrong! Please try again...",
        });
        setLoading(false);
      }
    } catch (error) {
      setStatus({
        success: false,
        message: "Unknown error occurs! Please try again...",
      });
    }
  };

  return (
    <div className="create-content form">
      {ImageUploaded === false ? (
        <div
          className="create-img-frame"
          onClick={() => {
            document.getElementById("create-img-input").click();
          }}
        >
          <div className="create-img-inner-frame">
            <input
              type="file"
              className="create-img-input"
              name="create-img-input"
              id="create-img-input"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            {/* <h5>- Choose your photo -</h5> */}
            <AiOutlineVideoCameraAdd
              className="create-content-icon"
              size={100}
            />
          </div>
        </div>
      ) : (
        <div className="create-img-frame preview-frame">
          {EncodedImg && (
            <img
              src={EncodedImg}
              alt="preview"
              className="create-preview-img"
            />
          )}
        </div>
      )}

      {ImageUploaded ? (
        <>
          <div className="form-row create-row">
            <label htmlFor="create-text" className="form-label create-label">
              Write a caption...
            </label>
            <textarea
              type="textarea"
              id="create-text"
              className="form-textarea create-textarea"
            ></textarea>
          </div>

          {Submitted && !Loading && (
            <div
              className={
                Status.success ? "alert alert-success" : "alert alert-danger"
              }
            >
              {Status.message}
            </div>
          )}

          <button
            className=" btn btn-block"
            type="submit"
            style={{ textTransform: "none" }}
            onClick={handleSubmitPhost}
          >
            Phost it!
            {Loading && <div className="loading loading-inline" />}
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateBox;
