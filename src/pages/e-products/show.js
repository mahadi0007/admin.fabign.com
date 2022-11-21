import React, { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { PrimaryButton } from "../../components/button";
import { Container } from "../../components/container";
import { Image } from "../../components/image/Index";
import { Toastify } from "../../components/toastify";
import { TitleBar } from "../../components/titleBar";
import { Loader } from "../../components/loading";
import { Card } from "../../components/card";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";
import { Images } from "../../utils/images";

const Show = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSingleEProduct = useCallback(async () => {
    try {
      const response = await Requests.EProduct.Show(id);
      console.log(response);
      if (response && response.status === 200) {
        setLoading(false);
        setData(response.data.body);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        Toastify.Error(error.message);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchSingleEProduct();
  }, [fetchSingleEProduct]);

  // styles
  const styles = {
    td: {
      width: 120,
    },
  };

  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="View Product"
        subTitle="View your product"
        tag="Home / E-commerce / Product /"
        pageTag="View product"
      />

      {/* Manage e-product button */}
      <Container.Column className="text-end">
        <Link to={"/dashboard/e-products"}>
          <PrimaryButton className="px-4 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage products
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {loading ? <Loader /> : null}

      {/* Main e-product card */}
      {!loading && Object.keys(data).length ? (
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Header className="bg-white rounded border-0">
              <div>
                <Text className="mb-0 ps-1 pt-3 fs-17">
                  View Product Details
                </Text>
              </div>
            </Card.Header>
            <hr />
            <Card.Body className="px-20 pb-4 pt-0">
              <Container.Column>
                <div className="d-lg-flex">
                  {/* Image */}
                  {data && data.featuredImage && data.featuredImage.small ? (
                    <div>
                      <Image
                        src={Requests.HostUrl + data.featuredImage.small}
                        alt=""
                        x={150}
                        y={150}
                      />
                    </div>
                  ) : (
                    <div>
                      <Image src={Images.Person} alt="" x={150} y={150} />
                    </div>
                  )}

                  <div className="ms-lg-5 mt-4 mt-lg-0">
                    <Text className="fs-16 font-weight-bolder mb-0">
                      {data && data.name ? data.name : "No Title"}{" "}
                      {data && data.banglaName && data.banglaName
                        ? `( ${data.banglaName} )`
                        : null}
                    </Text>
                    <table className="table table-sm table-borderless mb-0">
                      <tbody>
                        <tr>
                          <td className="ps-0" style={styles.td}>
                            <Text className="text-capitalized fs-14 mb-0">
                              brand
                            </Text>
                          </td>
                          <td>
                            <Text className="fs-14 mb-0">
                              : {data && data.brand ? data.brand.title : "N/A"}
                            </Text>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0" style={styles.td}>
                            <Text className="text-capitalized fs-14 mb-0">
                              Category
                            </Text>
                          </td>
                          <td>
                            <Text className="text-capitalized fs-14 mb-0">
                              :{" "}
                              {data && data.category && data.category.name
                                ? data.category.name
                                : "N/A"}
                            </Text>
                          </td>
                        </tr>
                        {/* <tr>
                                                    <td className='ps-0' style={styles.td}>
                                                        <Text className="text-capitalized fs-14 mb-0">
                                                            Discount Type
                                                        </Text>
                                                    </td>
                                                    <td>
                                                        <Text className="text-capitalized fs-14 mb-0">
                                                            : {data && data.discountType ? data.discountType : "N/A"}
                                                        </Text>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className='ps-0' style={styles.td}>
                                                        <Text className="text-capitalized fs-14 mb-0">
                                                            Discount Amount
                                                        </Text>
                                                    </td>
                                                    <td>
                                                        <Text className="text-capitalized fs-14 mb-0">
                                                            : {data && data.discountAmount ? data.discountAmount : 0} Tk
                                                        </Text>
                                                    </td>
                                                    
                                                </tr> */}
                        <tr>
                          <td className="ps-0" style={styles.td}>
                            <Text className="text-capitalized fs-14 mb-0">
                              Business Location
                            </Text>
                          </td>
                          <td>
                            <Text className="text-capitalized fs-14 mb-0">
                              :{" "}
                              {data &&
                              data.business_locations &&
                              data.business_locations.length > 0
                                ? data.business_locations.map((item, i) => {
                                    return (
                                      <span>
                                        {item}
                                        {i < data.business_locations.length - 1
                                          ? ", "
                                          : null}{" "}
                                      </span>
                                    );
                                  })
                                : "N/A"}
                            </Text>
                          </td>
                        </tr>
                        {data.variation &&
                        data.variation.parents.length > 0 ? null : (
                          <tr>
                            <td className="ps-0" style={styles.td}>
                              <Text className="text-capitalized fs-14 mb-0">
                                Selling Price
                              </Text>
                            </td>
                            <td>
                              <Text className="text-capitalized fs-14 mb-0">
                                :{" "}
                                {data && data.sellingPrice
                                  ? data.sellingPrice
                                  : 0}{" "}
                                Tk
                              </Text>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* <div className="ms-lg-5 mt-lg-4">
                                        <table className="table table-sm table-borderless">
                                            <thead>
                                                
                                            </thead>
                                        </table>
                                    </div> */}
                </div>

                {data.variation && data.variation.parents.length > 0 ? (
                  <>
                    <div className="mt-4">Variations</div>
                    <div>
                      <table className="table table-sm table-borderless">
                        <thead>
                          <tr>
                            {data &&
                              data.variation &&
                              data.variation.values &&
                              data.variation.values.map((item, index) => (
                                <th key={index}>{item.value}</th>
                              ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {data &&
                              data.variation &&
                              data.variation.values.map((item, index) => (
                                <td key={index}>
                                  <p>
                                    Price Excluding Tax:{" "}
                                    {item.priceExcludingTax} <br />
                                    Selling Price: {item.sellingPrice} <br />
                                    Alert Amount: {item.alertAmount}
                                  </p>
                                </td>
                              ))}
                          </tr>
                          <tr>
                            {data &&
                              data.variation &&
                              data.variation.values &&
                              data.variation.values.map((item, index) => (
                                <td key={index}>
                                  {item.images.map((item) => (
                                    <img
                                      className="ms-1"
                                      src={Requests.HostUrl + item}
                                      alt=""
                                      height={100}
                                      width={100}
                                    />
                                  ))}
                                </td>
                              ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="mt-3">
                    <Text className="fs-14">Gallary Images</Text>
                    {data.galleryImages &&
                      data.galleryImages.map((item, index) => (
                        <img
                          className="ms-1"
                          src={Requests.HostUrl + item.small}
                          alt=""
                          height={150}
                          width={150}
                        />
                      ))}
                  </div>
                )}
              </Container.Column>
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      ) : null}
    </div>
  );
};

export default Show;
