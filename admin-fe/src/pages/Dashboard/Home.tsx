import { useEffect, useState } from "react";

import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";

import { getStatistics } from "../../services/dashboard.service";

type Statistics = {
  totalUsers: number;

  totalProducts: number;

  totalOrders: number;

  totalRevenue: number;
};

export default function Home() {
  const [statistics, setStatistics] = useState<Statistics>({
    totalUsers: 0,

    totalProducts: 0,

    totalOrders: 0,

    totalRevenue: 0,
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const response = await getStatistics();

      setStatistics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="
        grid
        grid-cols-12
        gap-4
        md:gap-6
        "
      >
        <div
          className="
          col-span-12
          space-y-6
          xl:col-span-7
          "
        >
          <EcommerceMetrics
            totalUsers={statistics.totalUsers}
            totalProducts={statistics.totalProducts}
            totalOrders={statistics.totalOrders}
            totalRevenue={statistics.totalRevenue}
          />

          <MonthlySalesChart />
        </div>

        <div
          className="
          col-span-12
          xl:col-span-5
          "
        >
          <MonthlyTarget />
        </div>
      </div>
    </>
  );
}
