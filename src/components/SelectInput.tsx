import { SelectInputProps } from "@/utils/types";

export default function SelectInput({
  label,
  name,
  options,
  register,
  errors,
  isLoading,
}: SelectInputProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <select
        {...register(name, { required: `${label} selection is required` })}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">{isLoading ? "Loading..." : `Select ${label}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
