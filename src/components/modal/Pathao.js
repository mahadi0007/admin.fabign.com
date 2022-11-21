import React, { useState, useCallback, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { DangerButton, SuccessButton } from "../button";
import { X } from "react-feather";
import { Requests } from "../../utils/http";

export const PathaoModal = (props) => {
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [zone, setZone] = useState(null);
  const [zones, setZones] = useState([]);
  const [area, setArea] = useState(null);
  const [areas, setAreas] = useState([]);
  // Fetch data
  const fetchCities = useCallback(async () => {
    const response = await Requests.Pathao.GetCities();
    console.log("response");
    console.log(response.data.data);
    if (response && response.data) {
      setCities(response.data.data.data);
    }
    // setLoading(false);
  }, []);

  const fetchZones = useCallback(
    async (city) => {
      const response = await Requests.Pathao.GetZones(city);
      console.log("fetchZones");
      console.log(response.data.data);
      if (response && response.data) {
        setZones(response.data.data.data);
      }
      // setLoading(false);
    },
    [city]
  );

  const fetchAreas = useCallback(
    async (zone) => {
      const response = await Requests.Pathao.GetAreas(zone);
      console.log("fetchAreas");
      console.log(response.data.data);
      if (response && response.data) {
        setAreas(response.data.data.data);
      }
      // setLoading(false);
    },
    [zone]
  );

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      centered
      className="custom-modal"
    >
      <Modal.Header>
        <div className="d-flex w-100">
          <div>
            <h6 className="mt-2 mb-0">Pathao Modal</h6>
          </div>
          <div className="ms-auto">
            <DangerButton
              onClick={props.onHide}
              className="btn-danger rounded-circle border-0"
              style={{ padding: "7px 10px" }}
            >
              <X size={18} />
            </DangerButton>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          {cities.length > 0 && (
            <>
              <h6 className="mb-1">
                <i>Select City</i>
              </h6>
              <select
                style={{ width: 165, fontSize: 13, height: 42 }}
                className="form-control shadow-none"
                onChange={(event) => {
                  const value = event.target.value;
                  setCity(value);
                  props.setCity(value);
                  fetchZones(value);
                }}
              >
                {cities.map((item, i) => (
                  <option key={item.city_id} value={item.city_id}>
                    {item.city_name}
                  </option>
                ))}
              </select>
            </>
          )}
          {zones.length > 0 && (
            <>
              <h6 className="my-1">
                <i>Select Zone</i>
              </h6>
              <select
                style={{ width: 165, fontSize: 13, height: 42 }}
                className="form-control shadow-none"
                onChange={(event) => {
                  const value = event.target.value;
                  setZone(value);
                  props.setZone(value);
                  fetchAreas(value);
                }}
              >
                {zones.map((item, i) => (
                  <option key={item.zone_id} value={item.zone_id}>
                    {item.zone_name}
                  </option>
                ))}
              </select>
            </>
          )}
          {areas.length > 0 && (
            <>
              <h6 className="my-1">
                <i>Select Area</i>
              </h6>
              <select
                style={{ width: 165, fontSize: 13, height: 42 }}
                className="form-control shadow-none"
                onChange={(event) => {
                  const value = event.target.value;
                  setArea(value);
                  props.setArea(value);
                }}
              >
                {areas.map((item, i) => (
                  <option key={item.area_id} value={item.area_id}>
                    {item.area_name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <div className="pt-4">
          <SuccessButton
            type="submit"
            // disabled={props.loading}
            className="border-0 me-2"
            style={{ padding: "7px 20px", fontSize: 14 }}
            onClick={props.handleAction}
            disabled={!(city && zone && area)}
          >
            {props.loading ? "Loading ..." : "Create Order"}
          </SuccessButton>
          <DangerButton
            style={{ padding: "7px 20px", fontSize: 14 }}
            className="border-0 me-2"
            onClick={props.onHide}
          >
            Cancel
          </DangerButton>
        </div>
      </Modal.Body>
    </Modal>
  );
};
