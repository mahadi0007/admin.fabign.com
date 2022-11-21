import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Edit2 } from "react-feather";
import { SuccessButton } from "../../components/button";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { DataTable } from "../../components/table";
import { CustomError } from "../../utils/error";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // fetch Banner data
  const fetchPromoTutorialData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.PromoTutorial.Index(page, limit);
        console.log(response);
        if (response && response.status === 200) {
          setData(response.data.body.promoTutorial);
          setTotalRows(response.data.body.total);
        }
        setCurrentPage(page);
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
    [currentPage, limit]
  );

  useEffect(() => {
    fetchPromoTutorialData(1);
  }, []);

  // handle paginate page change
  const handlePageChange = (page) => {
    fetchPromoTutorialData(page);
  };

  // handle paginate row change
  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    const response = await Requests.PromoTutorial.Index(page, newPerPage);
    setData(response.data.body.promoTutorial);
    setLimit(newPerPage);
    setLoading(false);
  };

  // data columns
  const columns = [
    {
      name: "Url",
      minWidth: "120px",
      selector: (row) => (row.url ? row.url : "N/A"),
    },
    {
      name: "Action",
      grow: 0,
      minWidth: "150px",
      cell: (row) => (
        <div>
          <Link to={`/dashboard/promo-tutorial-manage/show/${row._id}`}>
            <SuccessButton type="button" className="btn-circle me-1">
              <Eye size={18} />
            </SuccessButton>
          </Link>
          <Link to={`/dashboard/promo-tutorial-manage/edit/${row._id}`}>
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
          mainTitle="Manage Promo Tutorial"
          subTitle="Manage your promo tutorial"
          tag="Home / Promotion /"
          pageTag="Manage promo tutorial"
        />

        {/* Main promotion card */}
        <Container.Column>
          <Card.Simple className="border-0">
            <Card.Body>
              <DataTable
                columns={columns}
                data={data}
                loading={loading}
                totalRows={totalRows}
                currentPage={currentPage}
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
