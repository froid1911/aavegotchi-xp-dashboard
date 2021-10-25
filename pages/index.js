import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import fetcher from "../fetcher";


export default function Home () { 
  

  let [gotchiId, setGotchiId] = useState(null)
  let [data, setData] = useState(null)

  useEffect(() => {
    if(data == null) {
      getXP();
    }
  }, [data])

  const getXP = async event => {
    if(event == null) {
      setData(await fetcher(null));
      setGotchiId(null);
      return;
    }

    event.preventDefault();
    let value = event.target.gotchiId.value
    console.log(value);
    setData(await fetcher(value));
    setGotchiId(value);
  }

  const reset = () => {
    setGotchiId(null);
    setData(null);
  }
  
  return <div className="container">
    
      <form onSubmit={getXP} className="form">
      <Row>
        <Col lg="6" >
        <input id="gotchiId" type="text" className="searchInput" autoComplete="gotchiId" placeholder="Enter Gotchi Id" required />
        </Col>
        <Col>
        <button className="btn btn-default searchBtn" type="submit">Search</button>
        </Col>
        <Col>
        <button className="btn btn-default searchBtn" type="reset" onClick={reset}>Reset</button>
        </Col>
        </Row>
      </form>
    
  
  { data && 
  <Row>
    {gotchiId && <h2>Received XP for Gotchi {gotchiId}</h2>}
    {gotchiId == null && <h2>Latest XP Receivers</h2>}
    <table className="table">
      <thead>
        <th className="text-center">Gotchi ID</th>
        <th className="text-center">Date</th>
        <th className="text-center">Amount</th>
      </thead>
      <tbody>
        {data.airdrops && data.airdrops.map(e => {
          console.log(e);
          return (
          <tr>
            <td className="text-center">
              {e.gotchi}
            </td>
            <td className="text-center">
              {e.date.toLocaleDateString("en-US")}
            </td>
            <td className="text-center">
              {e.amount} XP
            </td>
          </tr>)
        })}
      </tbody>
    </table>
    </Row>}
  </div>
  }

