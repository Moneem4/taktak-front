import React, {useState, useContext, useEffect} from "react";
import { RestaurantContext } from '../../../context/RestaurantContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Janvier",
    nbr: 40,
  },
  {
    name: "Février",
    nbr: 30,
  },
  {
    name: "Mars",
    nbr: 20,
  },
  {
    name: "Avril",
    nbr: 27,
  },
  {
    name: "Mai",
    nbr: 18,
  },
  {
    name: "Juin",
    nbr: 23,
  },
  {
    name: "Juillet",
    nbr: 9,
  },
  {
    name: "Aout",
    nbr: 19,
  },
  {
    name: "Septembre",
    nbr: 15,
  },
  {
    name: "Octobre",
    nbr: 24,
  },
  {
    name: "Novembre",
    nbr: 17,
  },
  {
    name: "Décembre",
    nbr: 21,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`} resto</p>
      </div>
    );
  }

  return null;
};

function RevenuByProductsList(props) {
  const { restaurantId } = props; 
  const { getRevenueByProductsList } = useContext(RestaurantContext);

  const [revenueProductsList, setRevenueProductsList] = useState();
  useEffect(() => {
    getRevenueByProductsList(restaurantId, setRevenueProductsList);
  }, [props]);

  return (
    <div>
      <BarChart
        width={650}
        height={300}
        data={revenueProductsList}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="articleName" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="articleRevenue" barSize={20} fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default RevenuByProductsList;
