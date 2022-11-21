import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { SmsForm } from "../../components/form/SmsForm";
import { Container } from "../../components/container";
import { TitleBar } from "../../components/titleBar";
import { Toastify } from "../../components/toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../../components/text";
import { Card } from "../../components/card";
import { Requests } from "../../utils/http";
import { MessageSquare } from "react-feather";

const Index = forwardRef(() => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState();
  const [validity, setValidity] = useState();
  const api_key = "53dGFfgGHO6UMSh46E63OWfu5tENdlQFN5KtPCgh";

  const getBalance = useCallback(async () => {
    try {
      const response = await Requests.Sms.Balance(api_key);
      if (response.status === 200) {
        setBalance(response.data.data.balance);
        setValidity(response.data.data.validity);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  // handle send sms
  const handleSendSms = async (data) => {
    try {
      setLoading(true);
      const response = await Requests.Sms.SendSMS(api_key, data.msg, data.to);
      if (response && response.status === 200) {
        if (response.data.error) {
          Toastify.Error(response.data.msg);
        } else {
          Toastify.Success("SMS sent succesfully");
        }
      }
      formRef.current.formReset();
      getBalance();
      setLoading(false);
    } catch (error) {
      if (error) {
        console.log("error");
        setLoading(false);
        if (error.response) {
          await CustomError(error.response);
        } else {
          Toastify.Error("Something going wrong.");
        }
      }
    }
  };
  return (
    <div>
      {/* Title bar */}
      <TitleBar
        mainTitle="Send SMS"
        subTitle="Send new sms"
        tag="Home / SMS /"
        pageTag="Send SMS"
      />

      {/* Main sms card */}
      <Container.Column>
        <Card.Simple className="border-0">
          <Card.Header className="bg-white rounded border-0">
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-20 fw-bolder">
                <MessageSquare size={20} /> SMS Campaign
              </Text>
            </div>
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">
                <span className="fw-bold">Balance: </span>
                {balance}
              </Text>
            </div>
            <div>
              <Text className="mb-0 ps-1 pt-3 fs-17">
                <span className="fw-bold">Validity: </span> {validity}
              </Text>
            </div>
          </Card.Header>
          <hr />
          <Card.Body className="px-20 pb-4 pt-0">
            {/* Sms Form */}

            <SmsForm ref={formRef} loading={loading} submit={handleSendSms} />
          </Card.Body>
        </Card.Simple>
      </Container.Column>
    </div>
  );
});

export default Index;
