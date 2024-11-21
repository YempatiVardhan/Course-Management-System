import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const authData = await auth(); // Await the auth() function to get auth data
  const { userId } = authData;   // Access userId directly
  const role = (authData as any)?.sessionClaims?.metadata?.role || "user"; // Use optional chaining

  // Fetch announcements without role-based batch filtering (as per schema)
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`rounded-md p-4 ${
              index === 0
                ? "bg-lamaSkyLight"
                : index === 1
                ? "bg-lamaPurpleLight"
                : "bg-lamaYellowLight"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
