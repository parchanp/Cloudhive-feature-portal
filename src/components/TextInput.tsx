import { TextInputProps } from "@/utils/types";

export default function TextInput({
  label,
  name,
  register,
  errors,
  placeholder,
  type = "text",
}: TextInputProps) {
  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register(name, { required: `${label} is required` })}
          placeholder={placeholder}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
        />
      ) : (
        <input
          {...register(name, { required: `${label} is required` })}
          placeholder={placeholder}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      )}
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
