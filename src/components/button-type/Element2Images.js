import React, { useState, useEffect } from "react";
import "./style.scss";
import { Plus, X } from "react-feather";
import { Text } from "../text";
import { SearchableSelect } from "../select";
import { DangerButton, SuccessButton } from "../button";
import { Requests } from "../../utils/http";
import { FileUploader } from "../fileUploader";

const Element2Images = (props) => {
  const [elementImages, setElementImages] = useState(
    props.elements !== null ? props.elements : [{ element: null, image: null }]
  );

  useEffect(() => {
    if (props.elements !== null) {
      setElementImages(props.elements);
    }
  }, [props.elements]);

  // Handle sub category search
  const handleElementSearch = async (query) => {
    try {
      const items = [];
      const response = await Requests.Search.Element2(query);
      if (response && response.status === 200) {
        if (response.data.data && response.data.data.length > 0) {
          for (let i = 0; i < response.data.data.length; i++) {
            const element = response.data.data[i];
            items.push({
              label: element.title,
              value: element._id,
            });
          }
        }
      }
      return items;
    } catch (error) {
      if (error) return [];
    }
  };

  // Add field
  const addElementImages = () => {
    setElementImages([...elementImages, { element: {}, image: null }]);
  };

  // Remove field
  const removeElementImages = (index) => {
    const fields = [...elementImages];
    fields.splice(index, 1);
    setElementImages(fields);
    props.data(fields);
  };

  // Handle input
  const handleElementImagesInputChange = (index, event, target) => {
    const fields = [...elementImages];
    if (target === "image") {
      fields[index].image = event;
    } else {
      fields[index].element = event;
    }
    setElementImages(fields);
    props.data(fields);
  };

  const clearElementImage = (index) => {
    const fields = [...elementImages];
    fields[index].image = null;
    setElementImages(fields);
    props.data(fields);
  };

  return (
    <div className="dynamic-additional-fields-container">
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-12 py-3 mb-3 border-bottom">
            <div className="d-flex">
              <Text className="fs-16 mb-0"> Button Elements </Text>
              {!props.view && (
                <div className="ms-auto">
                  <SuccessButton
                    type="button"
                    className="btn btn-circle"
                    onClick={addElementImages}
                  >
                    <Plus size={20} />
                  </SuccessButton>
                </div>
              )}
            </div>
          </div>

          {elementImages &&
            elementImages.map((item, i) => (
              <div className="col-12" key={i}>
                <div className="d-flex">
                  {/* Title */}
                  <div className="flex-fill w-50">
                    <div className="form-group mb-4">
                      <Text className="fs-13 mb-0">Element</Text>
                      {item.element && (
                        <SearchableSelect
                          placeholder="Element 2"
                          search={handleElementSearch}
                          defaultValue={item.element}
                          values={(data) =>
                            handleElementImagesInputChange(
                              i,
                              data.value,
                              "element"
                            )
                          }
                          borderRadius={5}
                          isDisabled={props.view && true}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      i > 0
                        ? "flex-fill w-50 px-2 px-md-3"
                        : "flex-fill w-50 ps-2 ps-md-3"
                    }
                  >
                    <div className="form-group mb-4">
                      <FileUploader
                        // error={errors.icon ? errors.icon.message : ""}
                        imageURL={(props.view || props.update) && item.image}
                        width={125}
                        height={110}
                        title="Image"
                        dataHandeller={(data) => {
                          handleElementImagesInputChange(i, data, "image");
                        }}
                        dataClear={() => {
                          clearElementImage(i);
                        }}
                        input={!props.view && true}
                        removable={!props.view && true}
                      />
                    </div>
                  </div>
                  {i !== 0 && !props.view ? (
                    <div className="pt-3">
                      <DangerButton
                        type="button"
                        className="btn btn-circle"
                        onClick={() => removeElementImages(i)}
                      >
                        {/* <Icon icon={x} size={22} /> */}
                        <X size={20} />
                      </DangerButton>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Element2Images;
