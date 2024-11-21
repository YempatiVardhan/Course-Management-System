"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { EventSchema, eventschema } from "@/lib/formValidationSchemas";
import { useState } from "react";

const EventForm = ({
  type,
  data,
  batches = [], 
}: {
  type: "create" | "update";
  data?: any;
  batches?: { id: number; batchname: string }[]; 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventschema),
    defaultValues: {
      ...data, // Populate form with default data for updates
    },
  });

  const onSubmit = handleSubmit((formData) => {
    console.log(formData);
    // Pass formData to the backend
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Event" : "Update Event"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {/* Event Title */}
        <InputField
          label="Event Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />

        {/* Description */}
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors.description}
        />

        {/* Batch Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="batchId" className="text-sm font-semibold">
            Select Batch
          </label>
          <select
            id="batchId"
            {...register("batchId", { required: "Batch is required" })}
            className="border p-2 rounded-md"
          >
            <option value="">Select a Batch</option>
            {batches.length > 0 ? (
              batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.batchname}
                </option>
              ))
            ) : (
              <option disabled>No batches available</option>
            )}
          </select>
          {errors.batchId && (
            <span className="text-red-500">{errors.batchId.message}</span>
          )}
        </div>

        {/* Start Time */}
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors.startTime}
          type="datetime-local"
        />

        {/* End Time */}
        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors.endTime}
          type="datetime-local"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-400 text-white p-2 rounded-md"
        disabled={batches.length === 0} // Disable button if no batches are available
      >
        {type === "create" ? "Create Event" : "Update Event"}
      </button>
    </form>
  );
};

export default EventForm;
