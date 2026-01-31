import { ImageUploadBox } from "../../common/ImageUploadBox/ImageUploadBox";
import { Product } from "@/type";
import { IMAGES } from "@/constants/images";

interface SidebarEditFormProps {
  isMuted: boolean;
  selectedCount: number;
  formData: Partial<Product>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onImageChange: (key: keyof Product, val: string) => void;
  handleSave: () => void;
}

export const SidebarEditForm = ({
  isMuted,
  selectedCount,
  formData,
  handleChange,
  onImageChange,
  handleSave,
}: SidebarEditFormProps) => {
  return (
    <div
      className={`p-4 flex flex-col gap-4 ${isMuted ? "opacity-50" : "opacity-100"}`}
    >
      <h3 className="font-bold font-mono text-lg border-b border-dashed border-dark-15 pb-2 text-dark-10 dark:text-white">
        {selectedCount > 0
          ? selectedCount > 1
            ? "Multiple Selected"
            : "Edit Product"
          : "Select to Edit"}
      </h3>

      {!isMuted && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Name
            </label>
            <input
              name="ProductName"
              value={formData.ProductName}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="Product Name"
            />
          </div>

          {/* MAIN IMAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Main Image URL
            </label>
            <ImageUploadBox
              label="Product Main Image"
              value={formData.ProductImage}
              onChange={(val) => onImageChange("ProductImage", val)}
              heightClass="h-24"
              placeholder={IMAGES.PLACEHOLDER.PRODUCT}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Price
            </label>
            <input
              name="Pricevalue"
              value={formData.Pricevalue}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="$0.00"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="product-category"
              className="text-sm font-mono text-gray-50 dark:text-gray-400"
            >
              Category
            </label>
            <select
              id="product-category"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm focus:ring-1 focus:ring-brown-60 outline-none"
            >
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* GALLERY IMAGES */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Gallery Images
            </label>
            <div className="grid grid-cols-3 gap-2">
              <ImageUploadBox
                label="G1"
                value={formData.image1}
                onChange={(val) => onImageChange("image1", val)}
                heightClass="h-16"
                placeholder={IMAGES.PLACEHOLDER.PRODUCT}
              />
              <ImageUploadBox
                label="G2"
                value={formData.image2}
                onChange={(val) => onImageChange("image2", val)}
                heightClass="h-16"
                placeholder={IMAGES.PLACEHOLDER.PRODUCT}
              />
              <ImageUploadBox
                label="G3"
                value={formData.image3}
                onChange={(val) => onImageChange("image3", val)}
                heightClass="h-16"
                placeholder={IMAGES.PLACEHOLDER.PRODUCT}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-mono text-gray-50 dark:text-gray-400">
              Description
            </label>
            <textarea
              name="designSummary"
              value={formData.designSummary}
              onChange={handleChange}
              rows={3}
              className="p-2 border border-dark-15 border-dashed rounded bg-white dark:bg-dark-15 text-dark-10 dark:text-white text-sm resize-none focus:ring-1 focus:ring-brown-60 outline-none"
              placeholder="Short description..."
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-2 w-full py-2 bg-brown-80/80 dark:bg-brown-60 text-white font-mono rounded hover:bg-brown-80 dark:hover:bg-brown-70 transition-colors shadow-lg active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};
