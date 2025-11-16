/**
 * File: src/components/FormField.tsx
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import { z } from "zod";

type Form = z.infer<typeof formSchema>;

export default function FormField() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: Form) => {
    console.log(data);
  };

  return (
    <div className="form-field">
      <form onSubmit={handleSubmit(onSubmit)} className="form-field__form">
        <input
          {...register("name")}
          placeholder="name"
          className="form-field__input"
        />
        {errors.name && (
          <p className="form-field__message">{errors.name.message}</p>
        )}

        <input
          {...register("email")}
          placeholder="email"
          className="form-field__input"
        />
        {errors.email && (
          <p className="form-field__message">{errors.email.message}</p>
        )}

        <input
          type="number"
          {...register("age", { valueAsNumber: true })}
          placeholder="age"
          className="form-field__input"
        />
        {errors.age && (
          <p className="form-field__message">{errors.age.message}</p>
        )}

        <button type="submit" className="form-field__button">
          submit
        </button>
      </form>
    </div>
  );
}
