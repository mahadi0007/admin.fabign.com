import React, { useCallback, useEffect, useState } from "react";
import { Edit, Trash2 } from "react-feather";
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
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { DeleteModal, PrimaryModal } from "../../components/modal";
import { FabricQualityForm } from "../../components/form/fabricQuality";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [qualityDelete, setQualityDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });
  const [createQuality, setCreateQuality] = useState({
    show: false,
    loading: false,
  });
  const [updateQuality, setUpdateQuality] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // fetch febric data
  const fetchFabricQuality = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Qualities.Index(page, limit);
        if (response && response.status === 200) {
          setData(response.data.data);
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
    fetchFabricQuality(1);
  }, [fetchFabricQuality]);

  // handle paginate page change
  const handlePageChange = (page) => fetchFabricQuality(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Fabric.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };
  // Handle search
  const handleSearch = async (data) => {
    setsearchLoading(true);
    const response = await Requests.Search.Quality(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Quality(value);
    console.log(response);
    if (response && response.data.data && response.data.data.length) {
      for (let i = 0; i < response.data.data.length; i++) {
        const element = response.data.data[i];
        data.results.push(element.type);
      }
    } else {
      data.message = "No results found";
    }
    return data;
  };

  // handle fabric Delete
  const handleQualityDelete = async () => {
    try {
      setQualityDelete({ ...qualityDelete, loading: true });
      const response = await Requests.Qualities.Delete(qualityDelete.value._id);
      if (response && response.status === 200) {
        fetchFabricQuality(1);
        Toastify.Success("Fabric Quality Deleted Successfully");
      }
      setQualityDelete({ ...qualityDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        setQualityDelete({ ...qualityDelete, show: false, loading: false });
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  // data columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.quality || "N/A",
      grow: 10,
    },
    {
      name: "Action",
      minWidth: "150px",
      cell: (row) => (
        <div>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setQualityDelete({ ...qualityDelete, value: row, show: true })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
          <SuccessButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setUpdateQuality({ ...qualityDelete, value: row, show: true })
            }
          >
            <Edit size={18} />
          </SuccessButton>
        </div>
      ),
    },
  ];

  const handleCreateQuality = async (data) => {
    setCreateQuality({ loading: true });
    try {
      const response = await Requests.Qualities.Store(data);
      if (response.status === 201) {
        Toastify.Success("Fabric Quality Successfully Create");
        fetchFabricQuality(1);
      }
      setCreateQuality({ loading: false, show: false });
    } catch (error) {
      if (error.response.status === 409) {
        Toastify.Error(error.response.data.message);
      }
      setCreateQuality({ loading: false, show: false });
    }
  };

  const handleUpdateQuality = async (data) => {
    setUpdateQuality({ loading: true });
    try {
      const response = await Requests.Qualities.Update(
        data,
        updateQuality.value._id
      );
      if (response.status === 201) {
        Toastify.Success("Fabric Quality Successfully Updated");
        fetchFabricQuality(1);
      }
      setUpdateQuality({ value: null, loading: false, show: false });
    } catch (error) {
      if (error.response.status === 409) {
        Toastify.Error(error.response.data.message);
      }
      setUpdateQuality({ value: null, loading: false, show: false });
    }
  };

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage fabric quality"
          subTitle="Manage your fabric qualities"
          tag="Home / Fabric /"
          pageTag="Manage fabric"
        />

        {/* Add fabric button */}
        <Container.Column className="text-end">
          <PrimaryButton
            className="px-4 mb-3"
            onClick={() => setCreateQuality({ show: true })}
          >
            <Text className="fs-15 mb-0">Add Quality</Text>
          </PrimaryButton>
        </Container.Column>

        {/* Main fabric card */}
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
                clearSearch={() => fetchFabricQuality(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete fabric confirmation modal */}
      <DeleteModal
        show={qualityDelete.show}
        loading={qualityDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {qualityDelete.value ? qualityDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          setQualityDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleQualityDelete}
      />
      {/* Primary Modal for Adding New type */}
      <PrimaryModal
        title="Create Fabric Quality"
        show={createQuality.show}
        size="md"
        onHide={() => setCreateQuality({ show: !createQuality.show })}
      >
        <FabricQualityForm handleCreate={handleCreateQuality} />
      </PrimaryModal>

      {/* Primary Modal for Updating new type */}
      {updateQuality && updateQuality.show && updateQuality.value ? (
        <PrimaryModal
          title="Update Fabric Quality"
          show={updateQuality.show}
          size="md"
          onHide={() => setUpdateQuality({ show: !updateQuality.show })}
        >
          <FabricQualityForm
            quality={updateQuality.value.quality}
            handleCreate={handleUpdateQuality}
          />
        </PrimaryModal>
      ) : null}
    </div>
  );
};

export default Index;
