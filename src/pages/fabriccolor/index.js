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
import { FabricColorForm } from "../../components/form/fabricColor";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchLoading, setsearchLoading] = useState(false);
  const [typeDelete, setTypeDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });
  const [createtype, setCreateType] = useState({ show: false, loading: false });
  const [updateType, setUpdateType] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // fetch febric data
  const fetchFebricColor = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Colors.Index(page, limit);
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
    fetchFebricColor(1);
  }, [fetchFebricColor]);

  // handle paginate page change
  const handlePageChange = (page) => fetchFebricColor(page);

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
    const response = await Requests.Search.Type(data);
    if (response.data) setData(response.data.data);
    setsearchLoading(false);
  };

  // Handle search suggestion
  const handleSuggestion = async (value) => {
    let data = {
      results: [],
      message: null,
    };
    const response = await Requests.Search.Type(value);
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
  const handleTypeDelete = async () => {
    try {
      setTypeDelete({ ...typeDelete, loading: true });
      const response = await Requests.Colors.Delete(typeDelete.value._id);
      if (response && response.status === 200) {
        fetchFebricColor(1);
        Toastify.Success("Fabric Deleted Successfully");
      }
      setTypeDelete({ ...typeDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        setTypeDelete({ ...typeDelete, show: false, loading: false });
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
      selector: (row) => row.color || "N/A",
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
              setTypeDelete({ ...typeDelete, value: row, show: true })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
          <SuccessButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setUpdateType({ ...typeDelete, value: row, show: true })
            }
          >
            <Edit size={18} />
          </SuccessButton>
        </div>
      ),
    },
  ];

  const handleCreateType = async (data) => {
    setCreateType({ loading: true });
    try {
      const response = await Requests.Colors.Store(data);
      if (response.status === 201) {
        Toastify.Success("Fabric Successfully Create");
        fetchFebricColor(1);
      }
      setCreateType({ loading: false, show: false });
    } catch (error) {
      if (error.response.status === 409) {
        Toastify.Error(error.response.data.message);
      }
      setCreateType({ loading: false, show: false });
    }
  };

  const handleUpdateType = async (data) => {
    setUpdateType({ loading: true });
    try {
      const response = await Requests.Colors.Update(data, updateType.value._id);
      if (response.status === 201) {
        Toastify.Success("Fabric Color Successfully Updated");
        fetchFebricColor(1);
      }
      setUpdateType({ value: null, loading: false, show: false });
    } catch (error) {
      if (error.response.status === 409) {
        Toastify.Error(error.response.data.message);
      }
      setUpdateType({ value: null, loading: false, show: false });
    }
  };

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage fabric color"
          subTitle="Manage your fabric colors"
          tag="Home / Fabric /"
          pageTag="Manage fabric"
        />

        {/* Add fabric button */}
        <Container.Column className="text-end">
          <PrimaryButton
            className="px-4 mb-3"
            onClick={() => setCreateType({ show: true })}
          >
            <Text className="fs-15 mb-0">Add Colors</Text>
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
                clearSearch={() => fetchFebricColor(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete fabric confirmation modal */}
      <DeleteModal
        show={typeDelete.show}
        loading={typeDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete {typeDelete.value ? typeDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          setTypeDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleTypeDelete}
      />
      {/* Primary Modal for Adding New type */}
      <PrimaryModal
        title="Update Fabric Color"
        show={createtype.show}
        size="md"
        onHide={() => setCreateType({ show: !createtype.show })}
      >
        <FabricColorForm handleCreate={handleCreateType} />
      </PrimaryModal>

      {/* Primary Modal for Updating new type */}
      {updateType && updateType.show && updateType.value ? (
        <PrimaryModal
          title="Update Fabric Color"
          show={updateType.show}
          size="md"
          onHide={() => setUpdateType({ show: !updateType.show })}
        >
          <FabricColorForm
            color={updateType.value.color}
            handleCreate={handleUpdateType}
          />
        </PrimaryModal>
      ) : null}
    </div>
  );
};

export default Index;
