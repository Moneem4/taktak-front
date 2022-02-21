import React, {useState, useContext, useEffect} from "react";
import { RestaurantContext } from '../../../context/RestaurantContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import _ from "lodash";

function RevenuPash(props) {
  const { restaurantId } = props; 
  const { getRevenuPash } = useContext(RestaurantContext);

  const [commandesList, setCommandesList] = useState();
  useEffect(() => {
    getRevenuPash(restaurantId, setCommandesList);
  }, [props]);

  const groups = _.groupBy(commandesList, "timeCreated");
  let data = [];
  Object.keys(groups).map((key) => {

    let sumRevenu = 0;
    const nbrPlaces = 30;
    for (let i = 0; i < groups[key].length; i++) {
      if (groups[key]) {
        for (let j = 0; j < groups[key][i].articlesC.length; j++) {
          sumRevenu = sumRevenu + (groups[key][i].articlesC[j].articleC.price*groups[key][i].articlesC[j].quantity);
        }
      }
    }

    const dataInput = {
      time: key+" H",
      val: (sumRevenu/nbrPlaces).toFixed(2)
    }
    data.push(dataInput);  
  })

  return (
    <div>
      <LineChart
        width={650}
        height={300}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="val" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </div>
  );
}

export default RevenuPash;
