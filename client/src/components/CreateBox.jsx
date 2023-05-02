import React, { useState } from "react";

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

  const handleFileInputChange = (e) => {
    console.log(e.target.files);
    setImageUploaded(true);
    const file = e.target.files[0];
    previewImg(file);
  };

  return (
    <div className="create-content form">
      {ImageUploaded === false ? (
        <div className="create-img-frame">
          <div className="create-img-inner-frame">
            <input
              type="file"
              className="create-img-input"
              name="create-img-input"
              id="create-img-input"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            <h5>- Choose your photo -</h5>
          </div>
        </div>
      ) : (
        <div className="create-img-frame preview-frame">
          <div className="create-img-inner-frame preview-inner-frame">
            {PreviewSource && (
              <img
                src={PreviewSource}
                alt="preview"
                className="create-preview-img"
              />
            )}
          </div>
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
