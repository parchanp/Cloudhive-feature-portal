import { useForm } from "react-hook-form";
import { IdeaFormValues } from "@/utils/types";
import { createIdea } from "@/actions/ideas";
import { useRouter } from "next/navigation";

export function useCreateIdeaForm() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IdeaFormValues>({
      defaultValues: { priority: "Low" },
    });
  
    const router = useRouter();
  
    const submitIdea = async (data: IdeaFormValues, setSubmitting: (state: boolean) => void) => {
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
  
    return { register, handleSubmit, errors, submitIdea };
  }
  
