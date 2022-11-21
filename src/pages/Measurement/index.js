import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DangerButton,
  PrimaryButton,
  SuccessButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";
import { Card } from "../../components/card";
import { Eye, Edit2, Trash2 } from "react-feather";
import { DeleteModal } from "../../components/modal";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // fetch Size data
  const fetchMeasurements = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Measurement.Index(page, limit);

        if (response && response.status === 200) {
          setData(response.data.data);
          console.log(response.data.data);
          setTotalRows(response.data.total);
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
    fetchMeasurements(1);
  }, [fetchMeasurements]);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchMeasurements(page);
  };
  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Size.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };
  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Size(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Size(value);
    if (response && response.data.data && response.data.data.length) {
      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        data.results.push(element.title);
      }
    } else {
      data.message = "No results found";
    }
    return data;
  };

  // data columns
  const columns = [
    {
      name: "Measurement Name",
      selector: (row) => row.measurement_name || "N/A",
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.title || 0,
    },
    {
      name: "Measurement Icon",
      selector: (row) => <img src={row.measurementIcon} alt="" />,
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/measurement/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`measurement/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            onClick={() =>
              setDelete({ value: row._id, show: true, loading: false })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  // delet measurement
  const handleFabricDelete = async () => {
    try {
      setDelete({ ...isDelete, loading: true });
      const response = await Requests.Measurement.Delete(isDelete.value);
      if (response.status) {
        fetchMeasurements(1);
        setDelete({ value: null, show: false, loading: false });
      }
    } catch (error) {}
  };

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage Size"
          subTitle="Manage your size"
          tag="Home / Size /"
          pageTag="Manage size"
        />

        {/* Add size button */}
        <Container.Column className="text-end">
          <Link to={"/dashboard/measurement/store"}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add Measurement</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main category card */}
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                loading={loading}
                totalRows={totalRows}
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                searchable
                placeholder={"Search"}
                search={handleSearch}
                suggestion={handleSuggestion}
                searchLoading={searchLoading}
                clearSearch={() => fetchMeasurements(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
        {/* Delete Modal */}
        <DeleteModal
          show={isDelete.show}
          loading={isDelete.loading}
          message={
            <Text className="fs-15">
              Want to delete {isDelete.value ? isDelete.value.title : null} ?
            </Text>
          }
          onHide={() => setDelete({ value: null, show: false, loading: false })}
          doDelete={handleFabricDelete}
        />
      </div>
    </div>
  );
};

export default Index;
