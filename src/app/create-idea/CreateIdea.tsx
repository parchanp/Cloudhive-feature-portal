"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/actions/employees";
import { priorities } from "@/utils/constants";
import { useCreateIdeaForm } from "@/hooks/useCreateIdeaForm";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";

export default function CreateIdea() {
  const { register, handleSubmit, errors, submitIdea } = useCreateIdeaForm();
  const [submitting, setSubmitting] = useState(false);

  const { data: employees = [], isPending } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    placeholderData: (previousData) => previousData,
  });

  return (
    <main className="p-6 min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-6">
          Submit a New Idea
        </h1>

        <form
          onSubmit={handleSubmit((data) => submitIdea(data, setSubmitting))}
          className="space-y-6"
        >
          <TextInput
            label="Summary"
            name="summary"
            register={register}
            errors={errors}
            placeholder="Enter idea summary"
          />
          <TextInput
            label="Description"
            name="description"
            register={register}
            errors={errors}
            placeholder="Enter detailed description"
            type="textarea"
          />
          <SelectInput
            label="Employee"
            name="employee"
            register={register}
            errors={errors}
            options={employees.map((emp) => emp.name)}
            isLoading={isPending}
          />
          <SelectInput
            label="Priority"
            name="priority"
            register={register}
            errors={errors}
            options={priorities}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            {submitting ? "Submitting..." : "Submit Idea"}
          </button>
        </form>
      </div>
    </main>
  );
}
