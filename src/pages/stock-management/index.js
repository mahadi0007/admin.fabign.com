import React, { useState, useCallback, useEffect } from "react";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Image } from "../../components/image/Index";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { ExpandableRow } from "../../components/expandableRow";
import { CustomError } from "../../utils/error";
import { Card } from "../../components/card";
import { Images } from "../../utils/images";
import { Requests } from "../../utils/http";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);

  // fetch data
  const fetchData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.EProduct.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.body.product);
          setTotalRows(response.data.body.total);
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          setLoading(false);
          if (error.response) {
            await CustomError(error.response);
          } else {
            Toastify.Error("Something going wrong.");
          }
        }
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // handle paginate page change
  const handlePageChange = (page) => fetchData(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.EProduct.Index(page, newPerPage);
    setData(response.data.body.product);
    setLimit(newPerPage);
    setLoading(false);
  };

  const handleUpdateStock = async () => {
    if (updatedData.length > 0) {
      setLoading(true);
      const response = await Requests.EProduct.StockUpdate(updatedData);
      console.log(response);
      if (response && response.status === 200) {
        Toastify.Success(response.data.message);
        fetchData(1);
      }
      setLoading(false);
    } else {
      setLoading(false);
      Toastify.Error("You have no update to save");
    }
  };

  const updateVariation = (data) => {
    console.log("updateVariation parent", data);
    let newArr = [...updatedData];
    console.log(newArr);
    if (newArr.find((i) => i.id === data[0].id)) {
      newArr.find((i) => i.id === data[0].id).variation = data[0].variation;
    } else {
      newArr.push(data[0]);
      setUpdatedData(newArr);
    }
  };

  // data columns
  const columns = [
    {
      name: "Image",
      selector: (row) =>
        row.featuredImage.large && row.featuredImage.large ? (
          <Image
            src={Requests.HostUrl + row.featuredImage.large}
            alt="Product image"
            x={50}
            y={50}
          />
        ) : (
          <Image src={Images.Person} alt="" x={50} y={50} />
        ),
      maxWidth: "15px",
    },
    {
      name: "Name",
      sortable: true,
      selector: (row) => row.name || "N/A",
      minWidth: "130px",
    },
    {
      name: "Category/Sub-Category",
      sortable: true,
      selector: (row) =>
        row.category && row.category.name ? row.category.name : "N/A",
    },
    {
      name: "SKU",
      sortable: true,
      selector: (row) => row.sku || "N/A",
      minWidth: "130px",
    },
    {
      name: "Type",
      sortable: true,
      selector: (row) =>
        row.variation.values.length > 0 ? "Variation" : "Product",
      minWidth: "130px",
    },
    {
      name: "Manage Stock",
      sortable: true,
      selector: (row) => "Yes",
      minWidth: "130px",
    },
    {
      name: "Stock Status",
      selector: (row) => "In Stock",
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Previous Stock",
      sortable: true,
      selector: (row) => (
        <div>
          <input
            type="number"
            name="stockamount"
            min={0}
            className="form-control shadow-none"
            placeholder="Enter price"
            defaultValue={row.stockAmount ? row.stockAmount : 0}
            readOnly
          />
        </div>
      ),
      minWidth: "150px",
    },
    {
      name: "Update Stock",
      sortable: true,
      selector: (row) => (
        <div>
          <input
            type="number"
            // name="stockamount"
            min={0}
            className="form-control shadow-none"
            placeholder="Enter price"
            defaultValue={row.stockAmount ? row.stockAmount : 0}
            onChange={(event) => {
              let value = event.target.value;
              let newArr = [...updatedData];
              if (newArr.find((i) => i.id === row._id)) {
                newArr.find((i) => i.id === row._id).stockAmount = value;
                setUpdatedData(newArr);
              } else {
                setUpdatedData((oldArray) => [
                  ...oldArray,
                  {
                    id: row._id,
                    stockAmount: value,
                  },
                ]);
              }
            }}
          />
        </div>
      ),
      minWidth: "150px",
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <ExpandableRow
      data={data.variation.values.map((item) => ({
        ...item,
        productId: data._id,
      }))}
      updateVariation={updateVariation}
    />
  );

  return (
    <div className="mb-4">
      {/* Title bar */}
      <TitleBar
        mainTitle="Manage Stock"
        subTitle="Manage your stock"
        tag="Home / Stock-Management /"
        pageTag="Manage stock"
      />

      {/* Main e-products card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Body>
            <span
              className="float-end"
              style={{ cursor: "pointer" }}
              onClick={handleUpdateStock}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </span>
            <DataTable
              columns={columns}
              data={data}
              loading={loading}
              totalRows={totalRows}
              handlePerRowsChange={handlePerRowsChange}
              handlePageChange={handlePageChange}
              expandableRows={true}
              expandableRowsComponent={ExpandedComponent}
              expandOnRowClicked={false}
              expandOnRowDoubleClicked={false}
              expandableRowsHideExpander={false}
              expandableRowDisabled={(row) => row.variation.values.length === 0}
              // searchable
              // placeholder={"Search elements"}
              // search={handleSearch}
              // suggestion={handleSuggestion}
              // searchLoading={searchLoading}
              // clearSearch={() => fetchData(1)}
            />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Index;
