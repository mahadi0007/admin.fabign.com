import React, { useEffect, useState, useCallback, useRef } from "react";
import JoditEditor from "jodit-react";
// import { Form } from 'react-bootstrap'
import { useForm, Controller } from "react-hook-form";
import { Text } from "../text";
import { Container } from "../container";
import { FormGroup } from "../formGroup";
import { PrimaryButton, SecondaryButton } from "../button";
// import { SearchableSelect } from '../select'
import { FileUploader, MultiFileUploader } from "../fileUploader";
import { CreatableSelect, SingleSelect } from "../select";
import { Requests } from "../../utils/http";
import { CustomError } from "../../utils/error";
import { Toastify } from "../../components/toastify";
import {
  AlertCircle,
  Minus,
  MinusCircle,
  Plus,
  PlusCircle,
} from "react-feather";
import { v4 as uuid } from "uuid";
import { collect } from "collect.js";

export const ProductForm = (props) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [brand, setBrand] = useState([]);
  const [subcategory, setSubsubcategory] = useState([]);
  const [businessLocation, setBusinessLocation] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [largeThumbnail, setLargeThumbnail] = useState();
  const [description, setDescription] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [stockmanage, setStockManage] = useState(false);
  const [productId, setProductId] = useState(null);

  // only for multi image
  const [product_image_error, setProductImageError] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productImages2, setProductImages2] = useState([]);
  // repetar section
  const [customfields, setCustomFields] = useState([
    { id: uuid(), label: null, value: null },
  ]);

  // variation
  const [variations, setVariations] = useState([]);
  const [variationIds, setVariationIDs] = useState([]);
  const [variationitems, setVariationItems] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variant, setVariant] = useState(false);
  const [loading, setLoading] = useState(false);

  // only for rich text editors
  const editor = useRef(null);
  const editor2 = useRef(null);

  // for single product
  const [includingTax, setIncludingTax] = useState();
  const [excludingTax, setExcludingTax] = useState();
  const [margin, setMargin] = useState();

  // fetch brand data
  const fetchEBrand = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.EBrand.Index(page);
      if (response && response.status === 200) {
        // setBrandList(response.data.body.brand)
        if (
          response.data &&
          response.data.body &&
          response.data.body.brand &&
          response.data.body.brand.length > 0
        ) {
          for (let i = 0; i < response.data.body.brand.length; i++) {
            const element = response.data.body.brand[i];

            items.push({
              label: element.title,
              value: element._id,
            });
          }
        }
      }
      setBrandList(items);
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  // fetch category data
  const fetchCategory = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.ECategory.Index(page);
      if (response && response.status === 200) {
        // setData(response.data.body)
        if (
          response.data &&
          response.data.body &&
          response.data.body.category &&
          response.data.body.category.length > 0
        ) {
          for (let i = 0; i < response.data.body.category.length; i++) {
            const element = response.data.body.category[i];

            items.push({
              label: element.name,
              value: element._id,
            });
          }
        }
      }
      setCategoryList(items);
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  // fetch subcategory data
  const fetchSubCategory = useCallback(async (page) => {
    try {
      const items = [];
      const response = await Requests.ESubCategory.Index(page);
      if (response && response.status === 200) {
        if (
          response.data &&
          response.data.body &&
          response.data.body.subcategory &&
          response.data.body.subcategory.length > 0
        ) {
          for (let i = 0; i < response.data.body.subcategory.length; i++) {
            const element = response.data.body.subcategory[i];

            items.push({
              label: element.name,
              value: element._id,
            });
          }
        }
      }
      setSubCategoryList(items);
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchEBrand(1);
  }, [fetchEBrand]);

  useEffect(() => {
    fetchCategory(1);
  }, [fetchCategory]);

  useEffect(() => {
    fetchSubCategory(1);
  }, [fetchSubCategory]);

  // Element form Submit
  const onSubmit = async (data) => {
    let isError = false;

    console.log(largeThumbnail);

    // if (!largeThumbnail) {
    //   setError("largeThumbnail", {
    //     type: "manual",
    //     message: "Image is required",
    //   });
    //   isError = true;
    // }

    // if (isError) return;

    let dataform = {};
    if (variants.length <= 0) {
      dataform = {
        productId: productId,
        name: data.name,
        banglaName: data.banglaName,
        sku: data.sku,
        barcodeType: data.barcodeType,
        brand: brand,
        category: data.category,
        subcategory: subcategory,
        manageStock: stockmanage,
        shortDescription: shortDescription,
        description: description,
        featuredImage: largeThumbnail,
        galleryImages: productImages,
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        applicableTax: data.applicableTax,
        sellingPriceTax: data.sellingPriceTax,
        productType: data.productType,
        published: true,
        stockAmount: data.stockAmount,
        alertQuantity: stockmanage ? data.alertQuantity : null,
        business_locations: businessLocation,
        customFields: customfields,
        priceIncludingTax: includingTax,
        priceExcludingTax: excludingTax,
        regularPrice: data.regularPrice,
        margin: margin,
        sellingPrice:
          (parseFloat(margin) / 100) * 100 + parseFloat(excludingTax),
      };
    } else {
      const variations = {
        parents: variationIds,
        values: variants,
      };

      dataform = {
        productId: productId,
        name: data.name,
        banglaName: data.banglaName,
        sku: data.sku,
        barcodeType: data.barcodeType,
        brand: brand,
        category: data.category,
        subcategory: subcategory,
        manageStock: stockmanage,
        shortDescription: shortDescription,
        description: description,
        featuredImage: largeThumbnail,
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        applicableTax: data.applicableTax,
        sellingPriceTax: data.sellingPriceTax,
        productType: data.productType,
        published: true,
        stockAmount: data.stockAmount,
        alertQuantity: stockmanage ? data.alertQuantity : null,
        business_locations: businessLocation,
        regularPrice: data.regularPrice,
        customFields: customfields,
        variation: variations ?? null,
      };
    }

    props.onSubmit(dataform);
  };

  // handle Products single Image
  const handleSingleImage = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("type", "productImage");
    if (productId !== null) {
      formData.append("productId", productId ?? null);
    }
    try {
      const response = await Requests.EProduct.UploadFile(formData);
      console.log(response);
      if (response.data.statusCode === 200) {
        const featuredImage = {
          small: response.data.body.small[0],
          large: response.data.body.large[0],
        };
        setLargeThumbnail(featuredImage);
        setProductId(response.data.body.productId);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  // for handling images from local state and server state
  const handleProductImages = async (file) => {
    if (productImages2.length >= 3) {
      setProductImageError("Maximum 3 Image Allowed");
      return;
    }

    // for uploading to server
    const formData = new FormData();
    formData.append("files", file);
    formData.append("type", "productImage");
    if (productId !== null) {
      formData.append("productId", productId ?? null);
    }
    let newimage = {};
    try {
      const response = await Requests.EProduct.UploadFile(formData);
      console.log(response);
      if (response.data.statusCode === 200) {
        newimage = {
          small: response.data.body.small[0],
          large: response.data.body.large[0],
        };
        setProductId(response.data.body.productId);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }

    console.log("newimages", newimage);
    // for product upload section
    const newImages = [...productImages];
    newImages.push(newimage);
    setProductImages(newImages);

    // for handleLocalSection
    const newImages2 = [...productImages2];
    newImages2.push(file);
    setProductImages2(newImages2);
  };

  // for handle local images
  const handleLocalImageDelete = (i) => {
    const images = [...productImages2];
    const newImages = images.filter((img, idx) => idx !== i);

    setProductImages2(newImages);
    setProductImageError("");
  };

  // custom fields section {from here we will continue variation section}
  const handleAddCustomFields = (id) => {
    setCustomFields([
      ...customfields,
      {
        id: id,
        label: "",
        value: "",
      },
    ]);
  };

  const handleRemoveCustomFields = (id) => {
    const values = [...customfields];
    if (customfields.length !== 1) {
      values.splice(
        values.findIndex((value) => value.id === id),
        1
      );
      setCustomFields(values);
    }
  };

  // adding values to custom fields
  const handleChangeInputCustomField = (id, event, type) => {
    const newInputFIelds = customfields.map((item) => {
      if (id === item.id) {
        if (type === "label") {
          item["label"] = event.target.value;
        }
        if (type === "value") {
          item["value"] = event.target.value;
        }
      }
      return item;
    });
    setCustomFields(newInputFIelds);
  };

  // variant section {from here we will continue variation section}
  const fetchVariants = useCallback(async () => {
    try {
      const response = await Requests.Variation.Index();
      const data = response.data.body.variation;
      const newData = data.map((item) => {
        return {
          id: item._id,
          label: item.name,
          value: item.values,
        };
      });
      setVariations(newData);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }, []);
  // fetching varients
  useEffect(() => {
    fetchVariants();
  }, [fetchVariants]);

  // setting varient to create extra fields
  const handleSetVariant = () => {
    setVariants([]);
    setVariant(!variant);
  };

  const handleAddVariationValues = (id) => {
    setLoading(false);
    variants.push({
      id: id,
      name: "",
    });
    setVariants(variants);
    setTimeout(() => {
      setLoading(true);
    }, 2);
  };

  // remove varient
  const handleRemoveVarient = (id) => {
    setLoading(false);
    variants.splice(
      variants.findIndex((value) => value.id === id),
      1
    );

    setTimeout(() => {
      setLoading(true);
    }, 2);
    setVariants(variants);
  };

  // adding values to varient
  const handleChangeInputVarient = (id, event, type) => {
    const newInputFIelds = variants.map((item) => {
      if (item.id === id) {
        if (type === "sku") item["sku"] = event.target.value;
        if (type === "value") item["value"] = event.target.value;
        if (type === "priceExcludingTax")
          item["priceExcludingTax"] = event.target.value;
        if (type === "priceIncludingTax")
          item["priceIncludingTax"] = event.target.value;
        if (type === "margin") item["margin"] = event.target.value;
        item["sellingPrice"] =
          (parseFloat(item.margin) / 100) * item.priceExcludingTax +
          parseFloat(item.priceExcludingTax);
        if (type === "manageStock") item["manageStock"] = event.target.value;
        if (type === "alertAmount") item["alertAmount"] = event.target.value;
        if (type === "stockAmount") item["stockAmount"] = event.target.value;
        if (type === "images") {
          const files = event.target.files;
          item["imagestab"] = files;
          const newfiles = [];
          let prodid = productId ?? null;
          for (const file of files) {
            const formData = new FormData();
            formData.append("files", file);
            if (prodid !== null) {
              formData.append("productId", prodid);
              // get cats
            }

            const getFile = async () => {
              try {
                const response = await Requests.EProduct.UploadFile(formData);
                if (response.data.statusCode === 200) {
                  newfiles.push(response.data.body.large[0]);
                  let prodid = response.data.body.productId;
                  setProductId(prodid);
                }
              } catch (error) {
                return error;
              }
            };
            getFile();
          }

          item["images"] = newfiles;
        }
      }
      return item;
    });

    setVariants(newInputFIelds);
  };

  // variation items
  useEffect(() => {
    setLoading(false);
    setVariants([]);
    if (variationitems.length) {
      let collection = collect(variationitems[0]);
      let joinedResult = [];

      variationitems.shift();

      joinedResult = collection.crossJoin(...variationitems);

      const variants = joinedResult.all().map((item) => {
        return { value: item.join("-"), id: uuid() };
      });
      setVariants(variants);
      setTimeout(() => {
        setLoading(true);
      }, 2);
    }
  }, [variationitems]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container.Row>
        {/* Title */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.name && errors.name.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.name && errors.name.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Name (EN)<span className="text-danger">*</span>
              </Text>
            )}

            <input
              type="text"
              className={
                errors.name
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter name"
              {...register("name", { required: "Name is required" })}
            />
          </FormGroup>
        </Container.Column>

        {/* Bangla title */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.banglaName && errors.banglaName.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.banglaName && errors.banglaName.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0"> Bangla Name (BN) </Text>
            )}

            <input
              type="text"
              className={
                errors.banglaName
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Bangla Name"
              {...register("banglaName")}
            />
          </FormGroup>
        </Container.Column>

        {/* SKU */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.sku && errors.sku.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.sku && errors.sku.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                SKU <AlertCircle size={14} />
              </Text>
            )}

            <input
              type="text"
              className={
                errors.sku
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Sku"
              {...register("sku")}
            />
          </FormGroup>
        </Container.Column>

        {/* Barcode */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.barcodeType && errors.barcodeType.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.barcodeType && errors.barcodeType.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                {" "}
                Barcode <AlertCircle size={14} />
              </Text>
            )}
            <select
              className="form-control shadow-none"
              {...register("barcodeType", {
                required: "Barcode is required",
              })}
            >
              {[
                "Code 39",
                "Code 128",
                "Interleaved 2 of 5",
                "UPC",
                "EAN",
                "PDF417",
                "Data Matrix",
                "Quick Response Codes",
              ].map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </FormGroup>
        </Container.Column>

        {/* Brand */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.brand && errors.brand.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.brand && errors.brand.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Brand</Text>
            )}
            <div className="d-flex justify-content-start">
              <div className="w-100">
                <SingleSelect
                  borderRadius={4}
                  placeholder="brand"
                  options={brandList}
                  value={(data) => {
                    setBrand(data.value);
                    clearErrors("brand");
                  }}
                />
              </div>
              <div className="p-2 border">
                <PlusCircle />
              </div>
            </div>
          </FormGroup>
        </Container.Column>

        {/* Stock Amount */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.stockAmount && errors.stockAmount.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.stockAmount && errors.stockAmount.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Stock Amount</Text>
            )}
            <input
              type="number"
              min={0}
              className={
                errors.stockAmount
                  ? "form-control shadow-none error"
                  : "form-control shadow-none"
              }
              placeholder="Enter Stock Amount"
              {...register("stockAmount")}
            />
          </FormGroup>
        </Container.Column>

        {/* Category */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.category && errors.category.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.category && errors.category.message}{" "}
                <span className="text-danger ">*</span>
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Category <span className="text-danger">*</span>{" "}
              </Text>
            )}

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is Required" }}
              render={({ field }) => (
                <SingleSelect
                  error={errors.category}
                  placeholder="a category"
                  options={categoryList}
                  value={(event) => {
                    setValue("category", event.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              )}
            />
          </FormGroup>
        </Container.Column>

        {/* Sub Category */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.subcategory && errors.subcategory.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.subcategory && errors.subcategory.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Sub Category </Text>
            )}

            <SingleSelect
              borderRadius={4}
              placeholder="sub category"
              options={subcategoryList}
              value={(data) => {
                setSubsubcategory(data.value);
                clearErrors("subcategory");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Business Location */}
        <Container.Column className="col-lg-4">
          <FormGroup>
            {errors.business_locations && errors.business_locations.message ? (
              <Text className="text-danger fs-13 mb-1">
                {errors.business_locations && errors.business_locations.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">
                Business Locations <AlertCircle size={15} />
              </Text>
            )}
            <CreatableSelect
              placeholder="business locations"
              value={(event) => {
                const value = [];
                event.map((item) => {
                  value.push(item.value);
                  return value;
                });
                setBusinessLocation(value);
                clearErrors("business_locations");
              }}
            />
          </FormGroup>
        </Container.Column>

        {/* Stock Section */}
        <Container.Column className={stockmanage ? `col-lg-4` : `col-lg-12`}>
          <FormGroup>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={stockmanage ? true : false}
                onChange={() => {
                  setStockManage(!stockmanage);
                }}
                style={{ cursor: "pointer" }}
                id="flexCheckDefault2"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckDefault2"
                style={{ cursor: "pointer" }}
              >
                Manage Stock? <AlertCircle size={15} />
              </label>
            </div>
            <span className="text-muted fs-12">
              Enable Stock Management at product level
            </span>
          </FormGroup>
        </Container.Column>

        {/* Alert Stocks Quantity */}
        {stockmanage ? (
          <Container.Column className="col-lg-8">
            <FormGroup>
              {errors.alertQuantity && errors.alertQuantity.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.alertQuantity && errors.alertQuantity.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0"> Alert Quantity </Text>
              )}

              <input
                type="number"
                min={0}
                step=".01"
                className={
                  errors.alertQuantity
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Alert Quantity"
                {...register("alertQuantity")}
              />
            </FormGroup>
          </Container.Column>
        ) : null}

        {/* Description */}
        <Container.Column className="col-lg-7">
          <FormGroup>
            {errors.description && errors.description.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.description && errors.description.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Description</Text>
            )}

            <JoditEditor
              ref={editor}
              config={{ readonly: false }}
              tabIndex={1}
              value={description}
              onBlur={(event) => setDescription(event)}
              onChange={(event) => {}}
            />
          </FormGroup>
        </Container.Column>

        {/* Short Description */}
        <Container.Column className="col-lg-5">
          <FormGroup>
            {errors.shortDescription && errors.shortDescription.message ? (
              <Text className="text-danger fs-13 mb-0">
                {errors.shortDescription && errors.shortDescription.message}
              </Text>
            ) : (
              <Text className="fs-13 mb-0">Short Description</Text>
            )}

            <JoditEditor
              ref={editor2}
              config={{ readonly: false }}
              tabIndex={1}
              value={shortDescription}
              onBlur={(event) => setShortDescription(event)}
              onChange={(event) => {}}
            />
          </FormGroup>
        </Container.Column>

        {/* Main Image */}
        <Container.Column className="col-lg-3">
          <div className="d-flex justify-content-start">
            <div>
              <FileUploader
                error={
                  errors.largeThumbnail ? errors.largeThumbnail.message : ""
                }
                width={140}
                height={140}
                title="Main Image"
                dataHandeller={(data) => {
                  if (data.error) {
                    setError("largeThumbnail", {
                      type: "manual",
                      message: data.error,
                    });
                  }

                  if (data.image) {
                    clearErrors("largeThumbnail");

                    handleSingleImage(data.image);
                  }
                }}
                input={true}
              />
            </div>
            {variant ? null : (
              <div className="ms-2">
                <MultiFileUploader
                  error={product_image_error}
                  images={productImages2}
                  width={130}
                  height={130}
                  limit={10000}
                  title={"Galary Image"}
                  dataHandeller={handleProductImages}
                  removable={false}
                  handleLocalImageDelete={handleLocalImageDelete}
                />
              </div>
            )}
          </div>
        </Container.Column>
      </Container.Row>

      {/* Extra Information Section */}
      <Container.Basic className="border rounded mb-3">
        <Container.Row className="pt-2">
          {/* Weight */}
          <Container.Column>
            <FormGroup>
              {errors.weight && errors.weight.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.weight && errors.weight.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0"> Weight </Text>
              )}

              <input
                type="number"
                min={0}
                step=".01"
                className={
                  errors.weight
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Weight"
                {...register("weight")}
              />
            </FormGroup>
          </Container.Column>
          <Text className="fs-14 fw-bolder">Dimensions</Text>
          {/* Length */}
          <Container.Column className="col-lg-4">
            <FormGroup>
              {errors.length && errors.length.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.length && errors.length.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0"> Length </Text>
              )}

              <input
                type="number"
                min={0}
                step=".01"
                className={
                  errors.length
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Length"
                {...register("length")}
              />
            </FormGroup>
          </Container.Column>

          {/* Width */}
          <Container.Column className="col-lg-4">
            <FormGroup>
              {errors.width && errors.width.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.width && errors.width.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0"> Width </Text>
              )}

              <input
                type="number"
                min={0}
                step=".01"
                className={
                  errors.width
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Width"
                {...register("width")}
              />
            </FormGroup>
          </Container.Column>

          {/* Height */}
          <Container.Column className="col-lg-4">
            <FormGroup>
              {errors.height && errors.height.message ? (
                <Text className="text-danger fs-13 mb-0">
                  {errors.height && errors.height.message}
                </Text>
              ) : (
                <Text className="fs-13 mb-0"> Height </Text>
              )}

              <input
                type="number"
                min={0}
                step=".01"
                className={
                  errors.height
                    ? "form-control shadow-none error"
                    : "form-control shadow-none"
                }
                placeholder="Height"
                {...register("height")}
              />
            </FormGroup>
          </Container.Column>
          {/* Button For Custom Fields */}
          <div className="mb-3">
            <span
              style={{ marginTop: "1.3rem", cursor: "pointer" }}
              className="text-primary"
              onClick={() => handleAddCustomFields(uuid())}
            >
              Add Custom Fields <PlusCircle size={18} />
            </span>
          </div>

          {/* Custom Fields */}
          {customfields &&
            customfields.map((item, index) => {
              return (
                <>
                  <Container.Column className="col-lg-12 mb-3" key={index}>
                    <div className="d-flex justify-content-start">
                      <FormGroup className="w-100">
                        {errors.label && errors.label.message ? (
                          <Text className="text-danger fs-13 mb-0">
                            {errors.label && errors.label.message}
                          </Text>
                        ) : (
                          <Text className="fs-13 mb-0">Custom Label </Text>
                        )}

                        <input
                          type="text"
                          className={
                            errors.heighlabel
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="Label"
                          onChange={(event) =>
                            handleChangeInputCustomField(
                              item.id,
                              event,
                              "label"
                            )
                          }
                        />
                      </FormGroup>
                      <FormGroup className="w-100 ms-3">
                        {errors.value && errors.value.message ? (
                          <Text className="text-danger fs-13 mb-0">
                            {errors.value && errors.value.message}
                          </Text>
                        ) : (
                          <Text className="fs-13 mb-0">Custom Value</Text>
                        )}

                        <input
                          type="number"
                          min={0}
                          step=".01"
                          className={
                            errors.value
                              ? "form-control shadow-none error"
                              : "form-control shadow-none"
                          }
                          placeholder="value"
                          onChange={(event) =>
                            handleChangeInputCustomField(
                              item.id,
                              event,
                              "value"
                            )
                          }
                        />
                      </FormGroup>
                      <div
                        className="border rounded ms-2 p-2"
                        style={{ marginTop: "1.3rem", cursor: "pointer" }}
                        onClick={() => handleRemoveCustomFields(uuid())}
                      >
                        <MinusCircle size={22} />
                      </div>
                    </div>
                  </Container.Column>
                </>
              );
            })}
        </Container.Row>
      </Container.Basic>

      <Container.Basic className="border rounded mb-3">
        <Container.Row className="mt-2">
          <>
            {/* Regular Price */}
            <Container.Column className="col-lg-6">
              <FormGroup>
                {errors.regularPrice && errors.regularPrice.message ? (
                  <Text className="text-danger fs-13 mb-0">
                    {errors.regularPrice && errors.regularPrice.message}
                  </Text>
                ) : (
                  <Text className="fs-13 mb-0"> Regular Price </Text>
                )}

                <input
                  type="number"
                  min={0}
                  step=".01"
                  className={
                    errors.regularPrice
                      ? "form-control shadow-none error"
                      : "form-control shadow-none"
                  }
                  placeholder="Enter Regular Price"
                  {...register("regularPrice", {
                    required: "Regular Price is required",
                  })}
                />
              </FormGroup>
            </Container.Column>

            {/* Selling Price tax */}
            <Container.Column className="col-lg-6">
              <FormGroup>
                {errors.sellingPriceTax && errors.sellingPriceTax.message ? (
                  <Text className="text-danger fs-13 mb-0">
                    {errors.sellingPriceTax && errors.sellingPriceTax.message}
                  </Text>
                ) : (
                  <Text className="fs-13 mb-0"> Selling Price</Text>
                )}

                <input
                  type="number"
                  min={0}
                  step=".01"
                  className={
                    errors.sellingPriceTax
                      ? "form-control shadow-none error"
                      : "form-control shadow-none"
                  }
                  placeholder="Enter Selling Price"
                  {...register("sellingPriceTax")}
                />
              </FormGroup>
            </Container.Column>
          </>
          {/* Extra Section for single product */}
          {!variant ? (
            <>
              {/* price including tax */}
              <Container.Column className="col-lg-6">
                <FormGroup>
                  {errors.priceExcludingTax &&
                  errors.priceExcludingTax.message ? (
                    <Text className="text-danger fs-13 mb-0">
                      {errors.priceExcludingTax &&
                        errors.priceExcludingTax.message}
                    </Text>
                  ) : (
                    <Text className="fs-13 mb-0"> Price excluding Tax </Text>
                  )}

                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className={
                      errors.priceExcludingTax
                        ? "form-control shadow-none error"
                        : "form-control shadow-none"
                    }
                    placeholder="Enter Price excluding Tax"
                    value={excludingTax}
                    onChange={(event) => setExcludingTax(event.target.value)}
                  />
                </FormGroup>
              </Container.Column>

              {/* price excluding tax */}
              <Container.Column className="col-lg-6">
                <FormGroup>
                  {errors.priceIncludingTax &&
                  errors.priceIncludingTax.message ? (
                    <Text className="text-danger fs-13 mb-0">
                      {errors.priceIncludingTax &&
                        errors.priceIncludingTax.message}
                    </Text>
                  ) : (
                    <Text className="fs-13 mb-0"> Price Including Tax </Text>
                  )}

                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className={
                      errors.priceIncludingTax
                        ? "form-control shadow-none error"
                        : "form-control shadow-none"
                    }
                    placeholder="Enter Price Including Tax"
                    value={includingTax}
                    onChange={(event) => setIncludingTax(event.target.value)}
                  />
                </FormGroup>
              </Container.Column>
              {/* margin */}
              <Container.Column className="col-lg-6">
                <FormGroup>
                  {errors.margin && errors.margin.message ? (
                    <Text className="text-danger fs-13 mb-0">
                      {errors.margin && errors.margin.message}
                    </Text>
                  ) : (
                    <Text className="fs-13 mb-0"> Margin </Text>
                  )}

                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className={
                      errors.margin
                        ? "form-control shadow-none error"
                        : "form-control shadow-none"
                    }
                    placeholder="Enter Margin"
                    value={margin}
                    onChange={(event) => setMargin(event.target.value)}
                  />
                </FormGroup>
              </Container.Column>
              {/* Selling Price */}
              <Container.Column className="col-lg-6">
                <FormGroup>
                  {errors.sellingPrice && errors.sellingPrice.message ? (
                    <Text className="text-danger fs-13 mb-0">
                      {errors.sellingPrice && errors.sellingPrice.message}
                    </Text>
                  ) : (
                    <Text className="fs-13 mb-0">
                      {" "}
                      Selling Price{" "}
                      <span className="text-muted">
                        (will auto generate)
                      </span>{" "}
                    </Text>
                  )}

                  <input
                    type="number"
                    min={0}
                    step=".01"
                    className={
                      errors.sellingPrice
                        ? "form-control shadow-none error"
                        : "form-control shadow-none"
                    }
                    placeholder="Enter Selling Price"
                    disabled
                    value={
                      (parseFloat(margin) / 100) * excludingTax +
                      parseFloat(excludingTax)
                    }
                  />
                </FormGroup>
              </Container.Column>
            </>
          ) : null}

          {/* Variation */}
          <div className="d-flex justify-content-start">
            <Text className="fs-22">Add Variation</Text>
            <div>
              <span
                className="btn btn-primary  p-1 m-1"
                onClick={() => handleSetVariant()}
                style={{ cursor: "pointer" }}
              >
                <Plus size={22} />
              </span>
            </div>
          </div>

          {/* main section for variant values and selections */}
          {variant ? (
            <>
              <Container.Column
                className="bg-success"
                style={{ borderRight: "1px solid white" }}
              >
                <Text className="text-white mb-0 mt-1 mb-1">Variation</Text>
              </Container.Column>
              <Container.Column className="mt-2">
                <CreatableSelect
                  placeholder="Variations"
                  options={variations}
                  value={(event) => {
                    const val = [];
                    event.map((item) => {
                      val.push(item.value);
                      return val;
                    });
                    setVariationItems(val);
                    const ids = [];
                    event.map((item) => {
                      ids.push(item.id);
                      return ids;
                    });
                    setVariationIDs(ids);
                  }}
                />
              </Container.Column>
              <Container.Column className="bg-success mt-3">
                <Text className="text-white mb-0 mt-1 mb-1">
                  Variation Values
                </Text>
              </Container.Column>

              <Container.Column className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <td>SKU</td>
                      <td>Value</td>
                      <td>Default Purchase Price</td>
                      <td>X Margin(%)</td>
                      <td>Default Selling Price</td>
                      <td>Manage Stock</td>
                      <td>Stock Amount</td>
                      <td>Alert Amount</td>
                      <td>Variation Images</td>
                      {/* <td><span className='btn btn-primary m-0 p-0' style={{ cursor: "pointer" }}><Plus /></span></td> */}
                      <td>
                        <span
                          className="btn btn-primary m-0 p-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleAddVariationValues(uuid())}
                        >
                          <Plus />
                        </span>
                      </td>
                    </tr>
                  </thead>
                  <thead>
                    {/* asdfa */}
                    {loading
                      ? variants &&
                        variants.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td style={{ width: "10%" }}>
                                <input
                                  type="text"
                                  placeholder="sku"
                                  className="form-control shadow-none"
                                  value={item.sku}
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "sku"
                                    )
                                  }
                                />
                              </td>
                              <td style={{ width: "20%" }}>
                                <input
                                  type="text"
                                  placeholder="variant"
                                  className="form-control shadow-none"
                                  value={item.value}
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "value"
                                    )
                                  }
                                />
                              </td>
                              <td style={{ width: "30%" }}>
                                <div className="d-flex justify-content-start">
                                  <input
                                    type="number"
                                    placeholder="excluding tax"
                                    step=".01"
                                    min={0}
                                    className="form-control shadow-none"
                                    value={item.priceExcludingTax}
                                    onChange={(event) =>
                                      handleChangeInputVarient(
                                        item.id,
                                        event,
                                        "priceExcludingTax"
                                      )
                                    }
                                  />
                                  <input
                                    type="number"
                                    placeholder="including tax"
                                    step=".01"
                                    min={0}
                                    className="form-control shadow-none ms-1"
                                    value={item.priceIncludingTax}
                                    onChange={(event) =>
                                      handleChangeInputVarient(
                                        item.id,
                                        event,
                                        "priceIncludingTax"
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  placeholder="margin"
                                  className="form-control shadow-none"
                                  value={item.margin}
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "margin"
                                    )
                                  }
                                />
                              </td>
                              <td style={{ width: "15%" }}>
                                <input
                                  type="number"
                                  step=".01"
                                  min={0}
                                  className="form-control shadow-none"
                                  value={
                                    (parseFloat(item.margin) / 100) *
                                      item.priceExcludingTax +
                                    parseFloat(item.priceExcludingTax)
                                  }
                                  disabled
                                />
                              </td>
                              <td>
                                <select className="form-control shadow-none">
                                  <option value="">Choose</option>
                                  <option value="true">True</option>
                                  <option value="false">false</option>
                                </select>
                              </td>
                              <td>
                                <input
                                  type="number"
                                  step=".01"
                                  min={0}
                                  className="form-control shadow-none"
                                  value={item.alertAmount}
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "alertAmount"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  step=".01"
                                  min={0}
                                  className="form-control shadow-none"
                                  value={item.stockAmount}
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "stockAmount"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="file"
                                  style={{ width: "10rem" }}
                                  multiple
                                  onChange={(event) =>
                                    handleChangeInputVarient(
                                      item.id,
                                      event,
                                      "images"
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <span
                                  className="btn btn-danger p-0 ps-1 pe-1"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleRemoveVarient(item.id)}
                                >
                                  <Minus size={12} />
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </thead>
                </table>
              </Container.Column>
            </>
          ) : null}
        </Container.Row>
      </Container.Basic>

      {/* Submit button */}
      <div className="text-end">
        <PrimaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Save and Add Another"}
          </Text>
        </PrimaryButton>
        {/* button */}
        <SecondaryButton
          type="submit"
          className="px-4 fw-bolder"
          disabled={props.loading}
        >
          <Text className="text-uppercase fs-14 mb-0">
            {props.loading
              ? props.update
                ? "Updating ..."
                : "Submitting ..."
              : props.update
              ? "Update"
              : "Reset"}
          </Text>
        </SecondaryButton>
      </div>
    </form>
  );
};

// [
//     [
//         "universel"
//     ],
//     [
//         "S",
//         "M",
//         "L",
//         "XL",
//         "XXL"
//     ],
//     [
//         "Red",
//         "Black",
//         "Blue",
//         "White"
//     ]
// ]

// ["universel", "S", "RED"]
// ["universel", "S", "Black"]
// ["universel", "S", "Blue"]
// ["universel", "M", "RED"]
// ["universel", "M", "Black"]
// ["universel", "M", "Blue"]
