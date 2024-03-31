// Chakra imports
import {
  Box,
  Flex,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React from "react";
// Assets
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "variables/charts";

export default function TotalSpent(props) {
  const { data, ...rest } = props;

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
      {...rest}>
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        
      </Flex>
      <Box minH='260px' minW='75%' mt='auto'>
        
        <LineChart
        chartData={lineChartDataTotalSpent} // Replace this with data from API
        chartOptions={lineChartOptionsTotalSpent}
      />
      </Box>
    </Card>
  );
}
