import React, { useState } from "react";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";

const CreateBox = () => {
  const [ImageUploaded, setImageUploaded] = useState(false);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [PreviewSource, setPreviewSource] = useState(null);

  const previewImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      const res = await fetch("/", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileInputChange = (e) => {
    console.log(e.target.files);

    const file = e.target.files[0];
    previewImg(file);

    setImageUploaded(true);
    setSelectedImage(file);
  };

  const handleSubmitPhost = async () => {
    console.log("submitting");
    if (PreviewSource !== null) {
      await uploadImage(PreviewSource);
    }
  };

  return (
    <div className="create-content form">
      {ImageUploaded === false ? (
        <div
          className="create-img-frame"
          onClick={() => {
            console.log("clicked");
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
          {PreviewSource && (
            <img
              src={PreviewSource}
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

          <button
            className=" btn btn-block"
            type="submit"
            style={{ textTransform: "none" }}
            onClick={handleSubmitPhost}
          >
            Phost it!
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CreateBox;
