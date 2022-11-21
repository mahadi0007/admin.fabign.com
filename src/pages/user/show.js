import React, { useCallback, useEffect, useState } from "react";
import { AlignJustify } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { TitleBar } from "../../components/titleBar";
import { Container } from "../../components/container";
import { PrimaryButton } from "../../components/button";
import { UserForm } from "../../components/form/user_form";
import { Requests } from "../../utils/http";
import { Toastify } from "../../components/toastify";

const Show = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchUser = useCallback(async (id) => {
    try {
      const response = await Requests.User.Show(id);
      if (response && response.status === 200) {
        setUser(response.data.body);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        Toastify.Error(error.message);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [fetchUser, id]);

  return (
    <div className="mb-3">
      <TitleBar
        mainTitle="Show User"
        subTitle="Show your user"
        tag="Home / User /"
        pageTag="Show user"
      />

      {/* Manage category button */}
      <Container.Column className="text-end">
        <Link to="/dashboard/user">
          <PrimaryButton className="px-3 mb-3">
            <Text className="fs-15 mb-0">
              <AlignJustify size={20} /> Manage user
            </Text>
          </PrimaryButton>
        </Link>
      </Container.Column>

      {/* Main category card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <Text className="mb-0 ps-1 pt-3 fs-17">Show user</Text>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            <UserForm loading={loading} data={user} view={true} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
};

export default Show;
