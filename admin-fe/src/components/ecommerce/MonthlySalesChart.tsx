import React from "react";
import Chart from "react-apexcharts";

import { ApexOptions } from "apexcharts";

import { MoreDotIcon } from "../../icons";

import { Dropdown } from "../ui/dropdown/Dropdown";

import { DropdownItem } from "../ui/dropdown/DropdownItem";

import { formatMoney } from "../../utils/format";

export default function MonthlySalesChart() {
  const [isOpen, setIsOpen] = React.useState(false);

  const options: ApexOptions = {
    colors: ["#465FFF"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 6,
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    yaxis: {
      labels: {
        formatter: (value) => {
          return formatMoney(value);
        },
      },
    },

    tooltip: {
      y: {
        formatter: (value) => {
          return formatMoney(value);
        },
      },
    },

    grid: {
      borderColor: "#E4E7EC",
    },
  };

  const series = [
    {
      name: "Revenue",

      data: [
        12000000, 15000000, 18000000, 14000000, 20000000, 22000000, 25000000,
        24000000, 28000000, 32000000, 35000000, 42000000,
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Monthly Sales</h3>

          <p className="text-sm text-gray-500">Revenue statistics by month</p>
        </div>

        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MoreDotIcon />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={() => setIsOpen(false)}>
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <Chart options={options} series={series} type="bar" height={310} />
    </div>
  );
}
