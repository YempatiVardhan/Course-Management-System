// import Announcements from "@/components/Announcements";
// import BigCalendar from "@/components/BigCalender";
// import BigCalendarContainer from "@/components/BigCalendarContainer";
// const TeacherPage = () => {
//   return (
//     <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
//       {/* LEFT */}
//       <div className="w-full xl:w-2/3">
//         <div className="h-full bg-white p-4 rounded-md">
//           <h1 className="text-xl font-semibold">Schedule</h1>
//           <BigCalendarContainer type="teacherId" id={!} />
//         </div>
//       </div>
//       {/* RIGHT */}
//       <div className="w-full xl:w-1/3 flex flex-col gap-8">
//         <Announcements />
//       </div>
//     </div>
//   );
// };

// export default TeacherPage;

import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async () => {
  // Use await to resolve the auth promise and get the userId
  const { userId } = await auth(); // Wait for the auth() promise to resolve
  
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
