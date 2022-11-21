import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton, SuccessButton } from "../../components/button";
import { Container } from "../../components/container";
import { Eye, Edit2 } from "react-feather";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);

  // fetch button data
  const fetchButtonType = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.ButtonType2.Index(page, limit);
        if (response && response.status === 200) {
          console.log(response.data.data);
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
    fetchButtonType(1);
  }, [fetchButtonType]);

  // handle paginate page change
  const handlePageChange = (page) => fetchButtonType(page);

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.ButtonType2.Index(page, newPerPage);
    setData(response.data.data);
    setLimit(newPerPage);
    setLoading(false);
  };

  // data columns
  const columns = [
    {
      name: "Category",
      selector: (row) => (row.category ? row.category : "N/A"),
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => (
        <div>
          <Link to={`/dashboard/buttontype2/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>

          <Link to={`/dashboard/buttontype2/edit/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Edit2 size={18} />
            </SuccessButton>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        {/* Title bar */}
        <TitleBar
          mainTitle="Manage button type"
          subTitle="Manage your button type"
          tag="Home / Button Type/"
          pageTag="Manage button type"
        />

        {/* Add button */}
        <Container.Column className="text-end">
          <Link to={`/dashboard/buttontype2/store`}>
            <PrimaryButton className="px-4 mb-3">
              <Text className="fs-15 mb-0">Add button type</Text>
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
              />
            </Card.Body>
          </Card.Simple>
        </Container.Column>
      </div>
    </div>
  );
};

export default Index;
