import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Header from "../components/header/header";
import fetcher from "../fetcher";

export default function Home() {
  let [gotchiId, setGotchiId] = useState(null);
  let [data, setData] = useState(null);

  useEffect(() => {
    if (data == null) {
      getXP();
    }
  }, [data]);

  const getXP = async (event) => {
    if (event == null) {
      setData(await fetcher(null));
      setGotchiId(null);
      return;
    }

    event.preventDefault();
    let value = event.target.gotchiId.value;
    console.log(value);
    setData(await fetcher(value));
    setGotchiId(value);
  };

  const reset = () => {
    setGotchiId(null);
    setData(null);
  };

  return (
    <>
      <Header />
      <div className="container">
        <form onSubmit={getXP} className="form">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Row>
                <Col lg="12">
                  <input
                    id="gotchiId"
                    type="text"
                    className="searchInput"
                    autoComplete="gotchiId"
                    placeholder="Enter Gotchi Id"
                    required
                  />
                </Col>
                <Col lg="12" className="buttonGroup">
                  <Button className="btn btn-default searchBtn" type="submit">
                    Search
                  </Button>
                </Col>
                <Button
                  className="btn btn-default searchBtn resetBtn"
                  type="reset"
                  onClick={reset}
                >
                  X
                </Button>
              </Row>
            </Col>
          </Row>
          <style>
            {`
            .gotchiImage {
              height: 200px;
              width: 200px;
            }

            .buttonGroup {
              margin-top: 10px;
            }
          `}
          </style>
        </form>

        {data && (
          <Row>
            <table className="table">
              <thead>
                <th className="text-center">Gotchi ID</th>
                <th className="text-center">Date</th>
                <th className="text-center">Amount</th>
              </thead>
              <tbody>
                {data.airdrops &&
                  data.airdrops.map((e) => {
                    return (
                      <tr>
                        <td className="text-center">{e.gotchi}</td>
                        <td className="text-center">
                          {e.date.toLocaleDateString()}{" "}
                          {e.date.toLocaleTimeString()}
                        </td>
                        <td className="text-center">{e.amount} XP</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Row>
        )}
      </div>
    </>
  );
}
