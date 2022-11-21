import React, { useState } from "react";
import "./style.scss";
import { Plus, XCircle } from "react-feather";
import { Requests } from "../../utils/http";

export const FileUploader = (props) => {
  const [selectedFile, setSelectedFile] = useState(
    props.deafult ? props.deafult : null
  );

  // Handle image
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const size = parseInt(file.size) / 1000;

      if (size > props.limit) {
        props.dataHandeller({
          error: `Select less than ${props.limit}KB file.`,
        });
        return;
      }
      if (props.shadowImage) {
        let img = new Image();
        img.src = window.URL.createObjectURL(file);
        let width;
        let height;
        img.onload = () => {
          width = img.width;
          height = img.height;
          props.dataHandeller({ image: file, width, height });
          setSelectedFile(URL.createObjectURL(file));
          return;
        };
      }
      props.dataHandeller({ image: file });
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="img-select-container">
      <div className="form-group mb-4">
        {props.error ? (
          <small className="text-danger">{props.error}</small>
        ) : (
          <small>{props.title}</small>
        )}

        <div className="d-flex">
          {selectedFile || props.imageURL ? (
            <div className="preview-container text-center me-2">
              <div
                className="image border"
                style={{
                  width: props.width ? props.width : 80,
                  height: props.height ? props.height : 80,
                }}
              >
                <img
                  src={selectedFile || props.imageURL}
                  className="img-fluid"
                  alt="..."
                />
                {props.removable === true ? (
                  <XCircle
                    onClick={() => {
                      props.dataClear();
                      setSelectedFile(null);
                    }}
                    size={16}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: "88%",
                      top: "2px",
                    }}
                  />
                ) : null}
                {props.loading ? (
                  <div className="thumbnail-overlay flex-center flex-column">
                    <div className="loader"></div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {props.input && (
            <div className="add-container text-center mr-3">
              <div
                className="image-plus border "
                style={{
                  width: props.width ? props.width : 80,
                  height: props.height ? props.height : 80,
                }}
              >
                <input type="file" className="upload" onChange={handleImage} />
                <div className="flex-center flex-column">
                  <Plus size={18} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const MultiFileUploader = (props) => {
  const {
    images,
    handleLocalImageDelete,
    handleServerImageDelete,
    removable,
    rating,
  } = props;
  const [error, setError] = useState("");

  // Handle image
  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const size = parseInt(file.size) / 1000;

      if (size > props.limit) {
        setError(`Select less than ${props.limit}KB file.`);
        return;
      }

      props.dataHandeller(file);
    }
  };

  return (
    <div className="img-select-container mr-2">
      <div className="form-group mb-4">
        {error ? (
          <small className="text-danger">{error}</small>
        ) : props.error ? (
          <small className="text-danger">{props.error}</small>
        ) : (
          <small>{props.title}</small>
        )}

        <div className="d-flex">
          {props.imageURLS &&
            props.imageURLS.map((image) => (
              <div
                key={image.uid}
                className="preview-container text-center mr-2"
              >
                <div
                  className="image border"
                  style={{
                    width: props.width ? props.width : 80,
                    height: props.height ? props.height : 80,
                  }}
                >
                  <img src={image.path} className="img-fluid" alt="..." />
                  {removable === true ? (
                    <XCircle
                      onClick={() => handleServerImageDelete(image.uid)}
                      size={16}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        left: "88%",
                        top: "2px",
                      }}
                    />
                  ) : null}
                </div>
              </div>
            ))}

          {images.map((image, i) => (
            <div key={i} className="preview-container text-center mr-2">
              <div
                className="image border"
                style={{
                  width: props.width ? props.width : 80,
                  height: props.height ? props.height : 80,
                }}
              >
                {rating ? (
                  <img
                    src={Requests.HostUrl + image}
                    className="img-fluid"
                    alt="..."
                  />
                ) : (
                  <img
                    src={URL.createObjectURL(image)}
                    className="img-fluid"
                    alt="..."
                  />
                )}
                {removable === true ? (
                  <XCircle
                    onClick={() => handleLocalImageDelete(i)}
                    size={16}
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      left: "88%",
                      top: "2px",
                    }}
                  />
                ) : null}
                {props.loading ? (
                  <div className="thumbnail-overlay flex-center flex-column">
                    <div className="loader"></div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}

          {!rating && (
            <div className="add-container text-center">
              <div
                className="image-plus border"
                style={{
                  width: props.width ? props.width : 80,
                  height: props.height ? props.height : 80,
                }}
              >
                <input type="file" className="upload" onChange={handleImage} />
                <div className="flex-center flex-column">
                  <Plus size={22} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
