import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

import { formatMoney, formatPercent } from "../../utils/format";

export default function MonthlyTarget() {
  const lastMonth = 28000000;

  const currentMonth = 35000000;

  const percentage = ((currentMonth - lastMonth) / lastMonth) * 100;

  const series = [Math.abs(Number(percentage.toFixed(1)))];

  const options: ApexOptions = {
    colors: ["#465FFF"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,

      sparkline: {
        enabled: true,
      },
    },

    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,

        hollow: {
          size: "80%",
        },

        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },

        dataLabels: {
          name: {
            show: false,
          },

          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",

            formatter: function (val) {
              return formatPercent(val);
            },
          },
        },
      },
    },

    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },

    stroke: {
      lineCap: "round",
    },

    labels: ["Growth"],
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Target
            </h3>

            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Revenue growth compared to last month
            </p>
          </div>

          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>

            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem onItemClick={closeDropdown}>View More</DropdownItem>

              <DropdownItem onItemClick={closeDropdown}>Delete</DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative">
          <div className="max-h-[330px]">
            <Chart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600">
            +{formatPercent(percentage)}
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Current month revenue is higher than last month. Keep up your good
          work!
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs">
            Last Month
          </p>

          <p className="text-center text-lg font-semibold">
            {formatMoney(lastMonth)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs">
            Current Month
          </p>

          <p className="text-center text-lg font-semibold">
            {formatMoney(currentMonth)}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs">Growth</p>

          <p className="text-center text-lg font-semibold text-success-600">
            +{formatPercent(percentage)}
          </p>
        </div>
      </div>
    </div>
  );
}
