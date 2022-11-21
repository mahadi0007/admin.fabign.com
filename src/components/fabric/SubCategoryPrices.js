import React, { useState } from "react";
import "./style.scss";
import { Plus, X } from "react-feather";
import { Text } from "../text";
import { SearchableSelect } from "../select";
import { DangerButton, SuccessButton } from "../button";
import { Requests } from "../../utils/http";

const SubCategoryPrices = (props) => {
  const [subCategoriesPrices, setSubCategoriesPrices] = useState([
    { sub_category: null, price: null },
  ]);

  // Handle sub category search
  const handleSubCategorySearch = async (query) => {
    try {
      const items = [];
      const response = await Requests.Search.SubCategory(query);
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
  const addSubCategoriesPrices = () =>
    setSubCategoriesPrices([
      ...subCategoriesPrices,
      { sub_category: null, price: null },
    ]);

  // Remove field
  const removeSubCategoriesPrices = (index) => {
    const fields = [...subCategoriesPrices];
    fields.splice(index, 1);
    setSubCategoriesPrices(fields);
  };

  // Handle input
  const handleSubCategoriesPricesInputChange = (index, event) => {
    const fields = [...subCategoriesPrices];
    if (event.target && event.target.name === "price") {
      fields[index].price = event.target.value;
    } else {
      fields[index].sub_category = event;
    }

    setSubCategoriesPrices(fields);
    props.data(subCategoriesPrices);
  };

  return (
    <div className="dynamic-additional-fields-container">
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-12 py-3 mb-3 border-bottom">
            <div className="d-flex">
              <Text className="fs-16 mb-0"> Sub Categories Price </Text>
              <div className="ms-auto">
                <SuccessButton
                  type="button"
                  className="btn btn-circle"
                  onClick={addSubCategoriesPrices}
                >
                  <Plus size={20} />
                </SuccessButton>
              </div>
            </div>
          </div>

          {subCategoriesPrices &&
            subCategoriesPrices.map((item, i) => (
              <div className="col-12" key={i}>
                <div className="d-flex">
                  {/* Title */}
                  <div className="flex-fill w-50">
                    <div className="form-group mb-4">
                      <Text className="fs-13 mb-0"> Sub Category </Text>
                      <SearchableSelect
                        placeholder="Sub category"
                        search={handleSubCategorySearch}
                        defaultValue={item.sub_category}
                        values={(data) =>
                          handleSubCategoriesPricesInputChange(i, data.value)
                        }
                        borderRadius={5}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div
                    className={
                      i > 0
                        ? "flex-fill w-50 px-2 px-md-3"
                        : "flex-fill w-50 ps-2 ps-md-3"
                    }
                  >
                    <div className="form-group mb-4">
                      <Text className="fs-13 mb-0"> Price </Text>

                      <input
                        type="number"
                        name="price"
                        min={0}
                        className="form-control shadow-none"
                        placeholder="Enter price"
                        defaultValue={item.price}
                        onChange={(event) =>
                          handleSubCategoriesPricesInputChange(i, event)
                        }
                      />
                    </div>
                  </div>

                  {i !== 0 ? (
                    <div className="pt-3">
                      <DangerButton
                        type="button"
                        className="btn btn-circle"
                        onClick={() => removeSubCategoriesPrices(i)}
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

export default SubCategoryPrices;
