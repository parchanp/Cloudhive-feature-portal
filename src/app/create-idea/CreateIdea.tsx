"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { IdeaFormValues } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/actions/employees";
import { priorities } from "@/utils/constants";
import { createIdea } from "@/actions/ideas";
import { useRouter } from "next/navigation";

export default function CreateIdea() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdeaFormValues>({
    defaultValues: { priority: "Low" },
  });

  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { data: employees = [], isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
    placeholderData: (previousData) => previousData,
  });

  const onSubmit = async (data: IdeaFormValues) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("employee", data.employee);
    formData.append("priority", data.priority);

    const response = await createIdea(formData);

    if (response.success) {
      alert("Idea submitted successfully!");
      router.push("/");
    } else {
      alert("Failed to submit idea: " + response.message);
    }

    setSubmitting(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
    >
      <div>
        <label className="block font-semibold mb-1">Summary</label>
        <input
          {...register("summary", { required: "Summary is required" })}
          placeholder="Enter idea summary"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter detailed description"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Employee</label>
        <select
          {...register("employee", {
            required: "Employee selection is required",
          })}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Select an Employee</option>
          {isPending ? (
            <option disabled>Loading....</option>
          ) : (
            employees.map((emp) => (
              <option key={emp.id} value={emp.name}>
                {emp.name}
              </option>
            ))
          )}
        </select>
        {errors.employee && (
          <p className="text-red-500 text-sm mt-1">{errors.employee.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-1">Priority</label>
        <select
          {...register("priority")}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full p-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
      >
        {submitting ? "Submitting..." : "Submit Idea"}
      </button>
    </form>
  );
}
