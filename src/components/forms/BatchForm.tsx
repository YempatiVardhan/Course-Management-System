"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import InputField from "../InputField";
import Image from "next/image";
import { BatchSchema , batchschema} from "@/lib/formValidationSchemas";

import {createBatch} from "@/lib/action";


const BatchForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BatchSchema>({
    resolver: zodResolver(batchschema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createBatch(data)
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new Batch</h1>
      
      
    
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Batch Name"
          name="BatchName"
          defaultValue={data?.BatchName}
          register={register}
          error={errors.BatchName}
        />
        <InputField
          label="Capacity"
          name="Capacity"
          type="number"
          defaultValue={data?.Capacity}
          register={register}
          error={errors.Capacity}
        />
        <InputField
          label="Teachers"
          name="Teachers"
          defaultValue={data?.Teachers}
          register={register}
          error={errors.Teachers}
        />
        <InputField
          label="Students"
          name="Students"
          defaultValue={data?.Students}
          register={register}
          error={errors.Students}
        />
        <InputField
          label="Zoom Link"
          name="ZoomLink"
          defaultValue={data?.ZoomLink}
          register={register}
          error={errors.ZoomLink}
        />
        
        
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default BatchForm;
