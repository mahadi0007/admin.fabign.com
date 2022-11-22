import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Edit2, Trash2 } from "react-feather";
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

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [isDefault, setDefault] = useState({ id: null, loading: false });
  const [topBarDelete, settopBarDelete] = useState({
    show: false,
    loading: false,
    value: null,
  });

  // fetch febric data
  const fetchTopbar = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.TopBar.Index(page, limit);
        if (response && response.status === 200) {
          console.log(response);
          setData(response.data.data);
          setTotalRows(
            response.data &&
              response.data.pagination &&
              response.data.pagination.items
          );
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          console.log(error);
          setLoading(false);
          if (error.response) {
            await CustomError(error.response);
          } else {
            Toastify.Error("Something went wrong, please try again later");
          }
        }
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchTopbar(1);
  }, [fetchTopbar]);

  // handle paginate page change
  const handlePageChange = (page) => fetchTopbar(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.TopBar.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // Handle default
  const handleDefault = async (value) => {
    try {
      setDefault({ id: value._id, loading: true });

      const response = await Requests.TopBar.MakeDefault(value._id);
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchTopbar(1);
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

  // Handle default
  const handleHidden = async (value) => {
    try {
      const response = await Requests.TopBar.Edit(value._id, {
        is_hidden: !value.is_hidden,
      });
      if (response && response.status === 201) {
        Toastify.Success(response.data.message);
        fetchTopbar(1);
      }
    } catch (error) {
      if (error) {
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };

  // handle fabric Delete
  const handleTopBarDelete = async () => {
    try {
      settopBarDelete({ ...topBarDelete, loading: true });
      const response = await Requests.TopBar.Delete(topBarDelete.value._id);
      if (response && response.status === 200) {
        fetchTopbar(1);
        Toastify.Success("Topbar Deleted Successfully");
      }
      settopBarDelete({ ...topBarDelete, show: false, loading: false });
    } catch (error) {
      if (error) {
        Toastify.Error("Something going wrong.");
        settopBarDelete({ ...topBarDelete, show: false, loading: false });
      }
    }
  };

  // data columns
  const columns = [
    {
      name: "Image",
      maxWidth: "100px",
      selector: (row) =>
        row.icon ? (
          <Image src={row.icon} className="my-1" alt="..." x={50} y={50} />
        ) : (
          "N/A"
        ),
    },
    {
      name: "Title",
      selector: (row) => row.title || "N/A",
    },
    {
      name: "Redirect Link",
      selector: (row) => row.link || "N/A",
    },
    {
      name: "Default",
      minWidth: "150px",
      selector: (row) => (
        <div>
          {row.is_default ? (
            <Text className="fs-14 text-success mb-0">Default</Text>
          ) : (
            <SecondarySMButton
              className="btn-sm"
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
      name: "Hidden",
      selector: (row) => (
        <span
          onClick={() => {
            handleHidden(row);
          }}
        >
          {row.is_hidden ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      ),
    },
    {
      name: "Action",
      minWidth: "150px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/topbar/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/topbar/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
          <DangerButton
            type="button"
            className="btn-circle"
            onClick={() =>
              settopBarDelete({ ...topBarDelete, value: row, show: true })
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
          mainTitle="Manage Topbar"
          subTitle="Manage your Topbars"
          tag="Home / Topbar /"
          pageTag="Manage Topbar"
        />

        {/* Add Topbar button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/topbar/store`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add Topbar</Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        {/* Main Topbar card */}
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
                clearSearch={() => fetchTopbar(1)}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>

      {/* Delete Topbar confirmation modal */}
      <DeleteModal
        show={topBarDelete.show}
        loading={topBarDelete.loading}
        message={
          <Text className="fs-15">
            Want to delete{" "}
            {topBarDelete.value ? topBarDelete.value.title : null} ?
          </Text>
        }
        onHide={() =>
          settopBarDelete({ value: null, show: false, loading: false })
        }
        doDelete={handleTopBarDelete}
      />
    </div>
  );
};

export default Index;
