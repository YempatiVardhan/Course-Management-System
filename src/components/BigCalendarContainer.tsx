// import prisma from "@/lib/prisma";
// import BigCalendar from "./BigCalender";

// type Batch = {
//   zoomLink: string;
//   // Add other properties here that exist on the `Batch` model
//   // for example, 'id', 'teacherId', 'startTime', etc.
// };

// const BigCalendarContainer = async ({
//   type,
//   id,
// }: {
//   type: "teacherId" | "batchId";
//   id: string | number;
// }) => {
//   // Fetch batches and infer types based on the Prisma schema
//   const batches = await prisma.batch.findMany({
//     where: {
//       ...(type === "teacherId"
//         ? { teacherId: id as number }
//         : { id: id as number }),
//     },
//   });

//   // Map batches to calendar events
//   const data = batches.flatMap((batch: Batch) => {  // Explicitly type `batch`
//     const scheduledDays = getScheduledDays(); // Replace with logic for batch schedule
//     return scheduledDays.map((day) => ({
//       title: `Join: ${batch.zoomLink}`,
//       start: day.startTime,
//       end: day.endTime,
//     }));
//   });

//   return (
//     <div>
//       <BigCalendar events={data} />
//     </div>
//   );
// };

// export default BigCalendarContainer;

// // Example utility function to generate scheduled days
// function getScheduledDays(): { startTime: Date; endTime: Date }[] {
//   const now = new Date();
//   const days = [1, 3, 5]; // Example: Monday, Wednesday, Friday
//   return days.map((day) => {
//     const date = new Date(now);
//     date.setDate(now.getDate() + ((day - now.getDay() + 7) % 7)); // Adjust to the correct day
//     const startTime = new Date(date.setHours(10, 0, 0)); // Example: 10:00 AM
//     const endTime = new Date(date.setHours(11, 0, 0)); // Example: 11:00 AM
//     return { startTime, endTime };
//   });
// }


// import prisma from "@/lib/prisma";
// import BigCalendar from "./BigCalender";

// type Batch = {
//   zoomLink: string;
//   // Add other properties here that exist on the `Batch` model
//   // for example, 'id', 'teacherId', 'startTime', etc.
// };

// const BigCalendarContainer = async ({
//   type,
//   id,
// }: {
//   type: "teacherId" | "batchId";
//   id: string | number;
// }) => {
//   // Fetch batches and infer types based on the Prisma schema
//   const batches = await prisma.batch.findMany({
//     where: {
//       ...(type === "teacherId"
//         ? { teacherId: id as number }
//         : { id: id as number }),
//     },
//   });

//   // Map batches to calendar events
//   const data = batches.flatMap((batch: Batch) => {  // Explicitly type `batch`
//     const scheduledDays = getScheduledDays(); // Replace with logic for batch schedule
//     return scheduledDays.map((day) => ({
//       title: `Join: ${batch.zoomLink}`,
//       start: day.startTime,
//       end: day.endTime,
//     }));
//   });

//   return (
//     <div>
//       <BigCalendar events={data} />
//     </div>
//   );
// };

// export default BigCalendarContainer;

// // Example utility function to generate scheduled days
// function getScheduledDays(): { startTime: Date; endTime: Date }[] {
//   const now = new Date();
//   const days = [1, 3, 5]; // Example: Monday, Wednesday, Friday
//   return days.map((day) => {
//     const date = new Date(now);
//     date.setDate(now.getDate() + ((day - now.getDay() + 7) % 7)); // Adjust to the correct day
//     const startTime = new Date(date.setHours(10, 0, 0)); // Example: 10:00 AM
//     const endTime = new Date(date.setHours(11, 0, 0)); // Example: 11:00 AM
//     return { startTime, endTime };
//   });
// }

import prisma from "@/lib/prisma";  // Import Prisma client
import BigCalendar from "./BigCalender";  // The calendar component
import { adjustScheduleToCurrentWeek } from "@/lib/utils";  // Utility function for scheduling adjustments

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";  // The type of query (by teacherId or batchId)
  id: string | number;  // The id of teacher or class
}) => {
  // Fetch the events based on teacherId or classId
  const dataRes = await prisma.event.findMany({
    where: {
      ...(type === "teacherId"
        ? {
            batch: {
              teacher: {
                teacherId: id as string,  // Fetch events for the teacher
              },
            },
          }
        : {
            batchId: id as number,  // Fetch events for the specific batch
          }),
    },
    include: {
      batch: true,  // Include batch data to get the Zoom link
    },
  });

  // Map the events to a format suitable for BigCalendar
  const events = dataRes.map((event) => ({
    title: `${event.title} - Zoom: ${event.batch.zoomLink}`,  // Display Zoom link with event title
    start: event.startTime,  // Event start time
    end: event.endTime,  // Event end time
    zoomLink: event.batch.zoomLink,  // Include zoomLink for additional reference (optional)
  }));

  // Adjust the events to match the current week (e.g., updating dates)
  const schedule = adjustScheduleToCurrentWeek(events);

  return (
    <div className="">
      <BigCalendar events={schedule} /> {/* Pass the adjusted events to BigCalendar */}
    </div>
  );
};

export default BigCalendarContainer;
