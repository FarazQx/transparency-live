// Chakra imports
import {
  Box,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";

export default function MonthlyRevenue(props) {
  const { data, ...rest } = props;

  return (
    <Card align='center' direction='column' w='100%' h='100%' {...rest}>

      <Box h='350px' mt='auto'>
        <BarChart
          chartData={barChartDataConsumption} // Replace this with data from API
          chartOptions={barChartOptionsConsumption}
        />
      </Box>
    </Card>
  );
}
