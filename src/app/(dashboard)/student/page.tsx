import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const StudentPage = async () => {
  // Await the auth() to get the current user's session
  const { userId } = await auth();

  // Fetch batches that the student is enrolled in
  const batchItems = await prisma.batch.findMany({
    where: {
      students: { some: { studentId: userId! } }, // Use studentId as per your schema
    },
  });

  // If the student is not enrolled in any batch, handle the case
  if (!batchItems.length) {
    return <div>No batches found for the student.</div>;
  }

  console.log(batchItems);

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule ({batchItems[0].batchname})</h1>
          <BigCalendarContainer type="batchId" id={batchItems[0].id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
