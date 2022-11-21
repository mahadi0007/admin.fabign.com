import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlignJustify, Eye, Edit2, Trash2 } from "react-feather";
import {
  DangerButton,
  PrimaryButton,
  SuccessButton,
} from "../../components/button/index";
import { DeleteModal } from "../../components/modal/index";
import { DataTable } from "../../components/table/index";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Requests } from "../../utils/http";
import { Container } from "../../components/container";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";

const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isDelete, setDelete] = useState({
    value: null,
    show: false,
    loading: false,
  });

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await Requests.Role.Index();
      if (response && response.status === 200) setData(response.data.data);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle delete
  const handleDelete = async () => {
    setDelete({ ...isDelete, loading: true });

    await Requests.Role.Delete(isDelete.value._id);
    fetchData();
    setDelete({ ...isDelete, show: false, loading: false });
  };

  const customStyles = {
    rows: {
      style: {
        minHeight: "100px auto",
      },
    },
  };

  const columns = [
    {
      name: "Role",
      sortable: true,
      selector: (row) => row.role,
    },
    {
      name: "Permissions",
      sortable: true,
      selector: (row) => (
        <ul className="pl-3 my-2">
          {row.rights &&
            row.rights.map((permission, i) => (
              <li key={i}>
                <p className="text-capitalize mb-1">{permission}</p>
              </li>
            ))}
        </ul>
      ),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "200px",
      cell: (row) => (
        <div className="py-2">
          <Link to={`/dashboard/role/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/role/edit/${row._id}`}>
            <SuccessButton className="btn-circle">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>

          <DangerButton
            className="btn-circle ms-1"
            onClick={() => setDelete({ value: row, show: true })}
          >
            <Trash2 size={18} />
          </DangerButton>
        </div>
      ),
    },
  ];

  return (
    <Container.Fluid>
      <Container.Row>
        {/* Title bar */}
        <Container.Column>
          <TitleBar
            mainTitle="Manage Role"
            subTitle="Manage your Role"
            tag="Home / Role & Permission /"
            pageTag="Manage your role"
          />
        </Container.Column>

        {/* Manage role button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/role/store`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">
                {" "}
                <AlignJustify size={20} /> Add role
              </Text>
            </PrimaryButton>
          </Link>
        </Container.Column>

        <Container.Column>
          <Card.Simple className="border-0 shadow-sm">
            <Card.Header className="bg-white rounded border-0">
              <div>
                <Text className="mb-0 ps-1 pt-3 fs-17">Role List</Text>
              </div>
            </Card.Header>
            <hr />

            {/* Data table component for show data */}
            <Card.Body>
              <DataTable
                fixedHeader
                fixedHeaderScrollHeight="580px"
                customStyles={customStyles}
                columns={columns}
                data={data}
                loading={isLoading}
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </Container.Row>

      {/* Delete confirmation */}
      <DeleteModal
        show={isDelete.show}
        loading={isDelete.loading}
        message={<h6>Want to delete this role ?</h6>}
        onHide={() => setDelete({ value: null, show: false, loading: false })}
        doDelete={handleDelete}
      />
    </Container.Fluid>
  );
};

export default Index;
