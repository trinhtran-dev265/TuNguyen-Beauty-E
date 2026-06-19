import { BoxCubeIcon, DollarLineIcon, GroupIcon } from "../../icons";
import { formatMoney } from "../../utils/format";
type Props = {
  totalUsers: number;

  totalProducts: number;

  totalOrders: number;

  totalRevenue: number;
};

export default function EcommerceMetrics({
  totalUsers,

  totalProducts,

  totalOrders,

  totalRevenue,
}: Props) {
  const metrics = [
    {
      title: "Users",

      value: totalUsers.toString(),

      icon: <GroupIcon className="size-6" />,

      color: "text-green-500",
    },

    {
      title: "Products",

      value: totalProducts.toString(),

      icon: <BoxCubeIcon className="size-6" />,

      color: "text-blue-500",
    },

    {
      title: "Orders",

      value: totalOrders.toString(),

      icon: <BoxCubeIcon className="size-6" />,

      color: "text-warning-500",
    },

    {
      title: "Revenue",

      value: formatMoney(totalRevenue),

      icon: <DollarLineIcon className="size-6" />,

      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
            {item.icon}
          </div>

          <span className="text-sm text-gray-500">{item.title}</span>

          <div className="mt-2 flex items-end justify-between">
            <h4 className="text-3xl font-bold">{item.value}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
