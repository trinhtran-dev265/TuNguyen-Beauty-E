import { useState } from "react";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

import Label from "../components/form/Label";
import TagManager from "../components/form/TagManager";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";

import { createProduct } from "../services/product.service";

export default function ProductForm() {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [stock, setStock] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [categories, setCategories] = useState([
    "Skincare",
    "Cleanser",
    "Makeup",
  ]);

  const [skinTypes, setSkinTypes] = useState([
    "Da dầu",
    "Da khô",
    "Da hỗn hợp",
    "Da nhạy cảm",
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedSkinType, setSelectedSkinType] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");

    setDescription("");

    setPrice("");

    setStock("");

    setImage(null);

    setPreview("");

    setSelectedCategory("");

    setSelectedSkinType("");
  };

  const handleCreate = async () => {
    try {
      if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !selectedCategory ||
        !selectedSkinType ||
        !image
      ) {
        alert("Vui lòng nhập đầy đủ thông tin");

        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);

      formData.append("description", description);

      formData.append("category", selectedCategory);

      formData.append("skinType", selectedSkinType);

      formData.append("price", price);

      formData.append("stock", stock);

      formData.append("image", image);

      await createProduct(formData);

      alert("Tạo sản phẩm thành công");

      resetForm();
    } catch (error) {
      console.log(error);

      alert("Tạo sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Create Product" description="Create Product" />

      <PageBreadcrumb pageTitle="Create Product" />

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Product Information</h3>

          <p className="mt-1 text-sm text-gray-500">Create a new product</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <Label>Product Name</Label>

            <Input
              type="text"
              placeholder="Vitamin C Serum"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label>Price</Label>

            <Input
              type="number"
              placeholder="350000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <Label>Stock</Label>

            <Input
              type="number"
              placeholder="15"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div>
            <Label>Upload Image</Label>

            <Input type="file" onChange={handleImage} />
          </div>

          {preview && (
            <div>
              <img
                src={preview}
                alt="preview"
                className="
                  h-[120px]
                  w-[120px]
                  rounded-lg
                  border
                  object-cover
                "
              />
            </div>
          )}

          <div className="lg:col-span-2">
            <TagManager
              label="Category"
              items={categories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              setItems={setCategories}
            />
          </div>

          <div className="lg:col-span-2">
            <TagManager
              label="Skin Type"
              items={skinTypes}
              selected={selectedSkinType}
              setSelected={setSelectedSkinType}
              setItems={setSkinTypes}
            />
          </div>

          <div className="lg:col-span-2">
            <Label>Description</Label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description..."
              className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              py-3
              dark:border-gray-700
              dark:bg-gray-800
            "
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </div>
      </div>
    </>
  );
}
