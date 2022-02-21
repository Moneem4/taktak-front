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

function RatioFollowers(props) {
  const { restaurantId } = props; 
  const { getRatioFollowersByDay } = useContext(RestaurantContext);

  const [ratioFollowersList, setRatioFollowersList] = useState();
  useEffect(() => {
    getRatioFollowersByDay(restaurantId, setRatioFollowersList);
  }, [props]);

  const groups = _.groupBy(ratioFollowersList, "createdAt");

  let data = [];
  Object.keys(groups).map((key) => {
    let dataInput;
    for (let i = 0; i < groups[key].length; i++) {
      dataInput = {
        day: key,
        val: groups[key].length
      } 
    }
    data.push(dataInput);  
  })

  return (
    <div>
      <h1>Ratio Followers</h1>
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
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="val" stroke="#8884d8" fill="#8884d8" />
      </LineChart>
    </div>
  );
}

export default RatioFollowers;
