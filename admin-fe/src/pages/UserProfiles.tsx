import { Link } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const products = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be",
    name: "Vitamin C Serum",
    category: "Skincare",
    skinType: "Da dầu",
    price: 350000,
    stock: 15,
  },

  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1617897903246-719242758050",
    name: "Niacinamide Serum",
    category: "Skincare",
    skinType: "Da hỗn hợp",
    price: 280000,
    stock: 8,
  },

  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
    name: "Cleanser",
    category: "Face Wash",
    skinType: "Mọi loại da",
    price: 180000,
    stock: 23,
  },
];

export default function UserProfiles() {
  return (
    <>
      <PageMeta title="Products" description="Product Management" />

      <PageBreadcrumb pageTitle="All Products" />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Skin Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />

                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>

                <td className="p-4">{product.category}</td>

                <td className="p-4">{product.skinType}</td>

                <td className="p-4 text-green-600">
                  {product.price.toLocaleString()}đ
                </td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      to="/profile?type=product"
                      className="rounded-lg bg-blue-500 px-3 py-1 text-white"
                    >
                      Edit
                    </Link>

                    <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
