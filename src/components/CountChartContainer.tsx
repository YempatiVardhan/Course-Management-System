// import Image from "next/image";
// import CountChart from "./CountChart";
// import prisma from "@/lib/prisma";

// const CountChartContainer = async () => {
//   const data = await prisma.student.groupBy({
//     by: ["UserSex"],
//     _count: true,
//   });

//   const boys = data.find((d) => d.UserSex === "MALE")?._count || 0;
//   const girls = data.find((d) => d. === "FEMALE")?._count || 0;

//   return (
//     <div className="bg-white rounded-xl w-full h-full p-4">
//       {/* TITLE */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Students</h1>
//         <Image src="/moreDark.png" alt="" width={20} height={20} />
//       </div>
//       {/* CHART */}
//       <CountChart boys={boys} girls={girls} />
//       {/* BOTTOM */}
//       <div className="flex justify-center gap-16">
//         <div className="flex flex-col gap-1">
//           <div className="w-5 h-5 bg-lamaSky rounded-full" />
//           <h1 className="font-bold">{boys}</h1>
//           <h2 className="text-xs text-gray-300">
//             Boys ({Math.round((boys / (boys + girls)) * 100)}%)
//           </h2>
//         </div>
//         <div className="flex flex-col gap-1">
//           <div className="w-5 h-5 bg-lamaYellow rounded-full" />
//           <h1 className="font-bold">{girls}</h1>
//           <h2 className="text-xs text-gray-300">
//             Girls ({Math.round((girls / (boys + girls)) * 100)}%)
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// };
 

// export default CountChartContainer;

import Image from "next/image";
import CountChart from "./CountChart";
import prisma from "@/lib/prisma";

// Define the type for the result of the `groupBy` query
type GroupByStudent = {
  sex: "MALE" | "FEMALE";
  _count: {
    studentId: number; // count of students by studentId (or any other field)
  };
};

const CountChartContainer = async () => {
  // Correct query for grouping students by sex
  const data = await prisma.student.groupBy({
    by: ["sex"], // Group by 'sex'
    _count: {
      studentId: true, // Count the number of students by 'studentId'
    },
  });

  // Explicitly type the parameter 'd' as GroupByStudent
  const boys = data.find((d) => d.sex === "MALE")?._count.studentId || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count.studentId || 0;

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <CountChart boys={boys} girls={girls} />
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">
            Boys ({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">
            Girls ({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
