import { VictoryChart, VictoryLine } from "victory";
import { ChartComponent } from "@syncfusion/ej2-react-charts";
import * as React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Page,
  Sort,
  Filter,
  Group,
} from "@syncfusion/ej2-react-grids";
import { data } from "../../datasource";

export default function Performance() {
  const pageSettings = { pageSize: 6 };
  const filterSettings = { type: "Excel" };
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  return (
    <div>
      <h2>Line Graph</h2>
    </div>
  );
}
