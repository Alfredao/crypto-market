import {Suspense} from "react";
import {useQuery} from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import {Table} from "react-bootstrap";
import getSpots from "../../app/spots/queries/getSpots";

const SpotPage = () => {

  const [spotQuery] = useQuery(getSpots, {})

  // useEffect(() => {
  // }, [])

  function Spots() {
    return (
      <>
        <h3>My spot</h3>
        <Table>
          <thead>
          <tr>
            <th>name</th>
            <th>balance</th>
          </tr>
          </thead>
          <tbody>
          {spotQuery.spots.map((spot) => (
            <tr key={spot.id}>
              <td>{spot.coin.name}</td>
              <td>{spot.balance}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </>
    )
  }


  return (
    <Layout title={"Spot"}>
      <main>
        <div className="container">
          <div className="row mt-3">
            <Suspense fallback="Loading...">
              <Spots/>
            </Suspense>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default SpotPage;
