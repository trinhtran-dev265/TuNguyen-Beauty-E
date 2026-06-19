import { useState, useEffect } from "react";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

import Label from "../components/form/Label";
import Button from "../components/ui/button/Button";
import { Modal } from "../components/ui/modal";
import Input from "../components/form/input/InputField";

import {
  getProducts,
  updateProduct,
  deleteProduct,
  updateProductStatus,
} from "../services/product.service";

type Product = {
  id: string;

  image: string;

  name: string;

  description: string;

  category: string;

  skinType: string;

  price: number;

  stock: number;

  isActive: boolean;
};

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();

      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (product: Product) => {
    setEditProduct({
      ...product,
    });

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSave = async () => {
    if (!editProduct) return;

    try {
      await updateProduct(
        editProduct.id,

        {
          name: editProduct.name,

          description: editProduct.description,

          category: editProduct.category,

          skinType: editProduct.skinType,

          price: editProduct.price,

          stock: editProduct.stock,
        },
      );

      await loadProducts();

      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete product?");

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (id: string) => {
    try {
      await updateProductStatus(id);

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageMeta title="Products" description="Products Management" />

      <PageBreadcrumb pageTitle="All Products" />

      <div
        className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        dark:border-gray-800
        dark:bg-gray-900
      "
      >
        <table className="w-full">
          <thead
            className="
            border-b
            bg-gray-50
            dark:bg-gray-800
          "
          >
            <tr>
              <th className="w-[25%] p-5 text-left font-semibold">Product</th>

              <th className="w-[25%] p-5 text-center font-semibold">
                Description
              </th>

              <th className="w-[10%] p-5 text-center font-semibold">
                Category
              </th>

              <th className="w-[12%] p-5 text-center font-semibold">
                Skin Type
              </th>

              <th className="w-[10%] p-5 text-center font-semibold">Price</th>

              <th className="w-[8%] p-5 text-center font-semibold">Stock</th>
              <th className="w-[10%] p-5 text-center font-semibold">Status</th>

              <th className="w-[10%] p-5 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="
                    border-b
                    transition
                    hover:bg-gray-50
                    dark:hover:bg-gray-800
                  "
              >
                <td className="p-5">
                  <div
                    className="
                        flex
                        items-center
                        gap-4
                      "
                  >
                    <img
                      src={`http://localhost:3000/uploads/products/${product.image}`}
                      alt={product.name}
                      className="
                      h-14
                      w-14
                      rounded-lg
                      object-cover
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/100x100?text=No+Image";
                      }}
                    />

                    <p
                      className="
                          font-medium
                          text-gray-800
                          dark:text-white
                        "
                    >
                      {product.name}
                    </p>
                  </div>
                </td>

                <td className="p-5 text-center text-sm text-gray-500">
                  {product.description.length > 40
                    ? `${product.description.slice(0, 40)}...`
                    : product.description}
                </td>

                <td className="p-5 text-center">{product.category}</td>

                <td className="p-5 text-center">{product.skinType}</td>

                <td className="p-5 text-center font-semibold text-green-600">
                  {product.price.toLocaleString()}đ
                </td>

                <td className="p-5 text-center">{product.stock}</td>
                <td className="p-5 text-center">
                  <span
                    className={
                      product.isActive
                        ? "rounded-full bg-green-100 px-3 py-1 text-xs text-green-600"
                        : "rounded-full bg-red-100 px-3 py-1 text-xs text-red-600"
                    }
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="p-5">
                  <div
                    className="
                        flex
                        justify-center
                        gap-2
                      "
                  >
                    <Button
                      size="sm"
                      className="w-[90px]"
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-[100px]"
                      onClick={() => handleStatus(product.id)}
                    >
                      {product.isActive ? "Disable" : "Enable"}
                    </Button>

                    <Button
                      size="sm"
                      className="
                          w-[90px]
                          bg-red-500
                          hover:bg-red-600
                        "
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="
        max-w-[700px]
        m-4
      "
      >
        {editProduct && (
          <div className="p-6">
            <h4
              className="
                mb-6
                text-2xl
                font-semibold
              "
            >
              Edit Product
            </h4>

            <div
              className="
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-2
              "
            >
              <div>
                <Label>Product Name</Label>

                <Input
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Category</Label>

                <Input
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      category: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Skin Type</Label>

                <Input
                  value={editProduct.skinType}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      skinType: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Price</Label>

                <Input
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      price: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <Label>Stock</Label>

                <Input
                  value={editProduct.stock}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      stock: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="lg:col-span-2">
                <Label>Description</Label>

                <textarea
                  rows={5}
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,

                      description: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    p-3
                  "
                />
              </div>
            </div>

            <div
              className="
                mt-6
                flex
                justify-end
                gap-3
              "
            >
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>

              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
