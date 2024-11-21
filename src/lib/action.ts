"use server"

import {BatchSchema} from './formValidationSchemas';
import prisma from './prisma';



// Create a new batch
export const createBatch = async (data: {
  BatchName: string;
  Capacity: number;
  Teachers: string; // Comma-separated teacher IDs as a string
  Students: string; // Comma-separated student IDs as a string
  ZoomLink: string;
}) => {
  try {
    // Map incoming data to match the expected parameter structure
    const batchData = {
      batchname: data.BatchName,
      capacity: data.Capacity,
      teacherId: data.Teachers ? parseInt(data.Teachers) : undefined, // Assuming a single teacher ID
      studentIds: data.Students.split(",").map((id) => parseInt(id)), // Convert to number[]
      zoomLink: data.ZoomLink,
    };

    const result = await prisma.batch.create({
      data: {
        batchname: batchData.batchname,
        capacity: batchData.capacity,
        teacherId: batchData.teacherId,
        zoomLink: batchData.zoomLink,
        students: {
          connect: batchData.studentIds.map((id) => ({ id })),
        },
      },
    });

    return { success: true, data: result, error: false };
  } catch (err) {
    console.error("Error creating batch:", err);
    return { success: false, error: true };
  }
};

// Get all batches
export const getBatches = async () => {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        teacher: true,
        students: true,
        events: true,
      },
    });
    return { success: true, data: batches, error: false };
  } catch (err) {
    console.error("Error fetching batches:", err);
    return { success: false, error: true };
  }
};

// Update a batch
export const updateBatch = async (data: {
  id: number;
  BatchName?: string;
  Capacity?: number;
  Teachers?: string; // Comma-separated teacher IDs
  Students?: string; // Comma-separated student IDs
  ZoomLink?: string;
}) => {
  try {
    const batchUpdateData: any = {
      batchname: data.BatchName,
      capacity: data.Capacity,
      teacherId: data.Teachers ? parseInt(data.Teachers) : undefined,
      zoomLink: data.ZoomLink,
      students: data.Students
        ? {
            set: data.Students.split(",").map((id) => ({ id: parseInt(id) })),
          }
        : undefined,
    };

    const result = await prisma.batch.update({
      where: { id: data.id },
      data: batchUpdateData,
    });

    return { success: true, data: result, error: false };
  } catch (err) {
    console.error("Error updating batch:", err);
    return { success: false, error: true };
  }
};

// Delete a batch
export const deleteBatch = async (id: number) => {
  try {
    await prisma.batch.delete({
      where: { id },
    });
    return { success: true, error: false };
  } catch (err) {
    console.error("Error deleting batch:", err);
    return { success: false, error: true };
  }
};

// Get a batch by ID
export const getBatchById = async (id: number) => {
  try {
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        teacher: true,
        students: true,
        events: true,
      },
    });
    if (!batch) {
      return { success: false, error: true, message: "Batch not found" };
    }
    return { success: true, data: batch, error: false };
  } catch (err) {
    console.error("Error fetching batch by ID:", err);
    return { success: false, error: true };
  }
};
