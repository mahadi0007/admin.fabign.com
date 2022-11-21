import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  DangerButton,
  PrimaryButton,
  SecondarySMButton,
  SuccessButton,
} from "../../components/button";
import { Container } from "../../components/container";
import { Image } from "../../components/image/Index";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { DeleteModal } from "../../components/modal";
import { Eye, Edit2, Trash2 } from "react-feather";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isDefault, setDefault] = useState({ id: null, loading: false });
  const [buttonDelete, setButtonDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch button data
  const fetchButton = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.Button2.Index(page, limit);
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
    fetchButton(1);
  }, [fetchButton]);

  // handle paginate page change
  const handlePageChange = (page) => fetchButton(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.Button2.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle default
  const handleDefault = async (value) => {
    try {
      setDefault({ id: value._id, loading: true });

      const data = {
        id: value._id,
        category: value.category._id,
      };

      const response = await Requests.Button2.MakeDefault(data);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchButton(1);
      }

      setDefault({ id: value._id, loading: true });
    } catch (error) {
      if (error) {
        setDefault({ id: value._id, loading: true });
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  // handle Button Delete
  const handleButtonDelete = async () => {
    try {
      setButtonDelete({ ...buttonDelete, loading: true });
      const response = await Requests.Button2.Delete(buttonDelete.value._id);
      if (response && response.status === 200) {
        fetchButton(1);
        Toastify.Success("Button Deleted Successfully");
      }
      setButtonDelete({ ...buttonDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        setButtonDelete({ ...buttonDelete, show: false, loading: false });
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
      name: "Image",
      maxWidth: "100px",
      selector: (row) => <Image src={row.main_image} alt="..." x={50} y={50} />,
    },
    {
      name: "Title",
      selector: (row) => row.title || "N/A",
      minWidth: "150px",
    },
    {
      name: "Price",
      selector: (row) => row.price || 0,
    },
    {
      name: "Default",
      minWidth: "150px",
      cell: (row) => (
        <div>
          {row.is_default ? (
            <Text className="fs-14 text-success mb-0 mr-2">Default</Text>
          ) : (
            <SecondarySMButton
              className="btn-sm mr-2"
              onClick={() => handleDefault(row)}
              disabled={row._id === isDefault.id && isDefault.loading}
            >
              <Text className="fs-14 mb-0">
                {row._id === isDefault.id && isDefault.loading
                  ? "Loading..."
                  : "Make Default"}
              </Text>
            </SecondarySMButton>
          )}
        </div>
      ),
    },
    {
      name: "Action",
      minWidth: "150px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/button2/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/button2/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              setButtonDelete({ ...buttonDelete, value: row, show: true })
            }
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage button"
          subTitle="Manage your buttons"
          tag="Home / Button /"
          pageTag="Manage button"
        />

        {/* Add button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/button2/store`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add button</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main button card */}
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

                // searchable
                // placeholder={"Search"}
                // search={handleSearch}
                // suggestion={handleSuggestion}
                // searchLoading={searchLoading}
                // clearSearch={() => fetchButton(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete Button confirmation modal */}
      <DeleteModal
        show={buttonDelete.show}
        loading={buttonDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {buttonDelete.value ? buttonDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          setButtonDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleButtonDelete}
      />
    </div>
  );
};

export default Index;