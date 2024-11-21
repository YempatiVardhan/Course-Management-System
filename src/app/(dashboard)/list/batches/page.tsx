import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { Prisma, Batch, Teacher, Student } from "@prisma/client";
import Image from "next/image";
import { ITEM_PER_PAGE } from "@/lib/settings";
import prisma from "@/lib/prisma";

// Custom type for Batch with Teacher and Students relations
type BatchWithRelations = Batch & {
  teacher: Teacher | null;
  students: Student[];
};

// Define columns for the Table component
const columns = [
  {
    header: "Batch Name",
    accessor: "batchname",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Number of Students",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Zoom Link",
    accessor: "zoomLink",
    className: "hidden md:table-cell",
  },
  ...(role === "admin"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

// Function to render each row with the relevant details
const renderRow = (batch: BatchWithRelations) => (
  <tr
    key={batch.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{batch.batchname}</td>
    <td className="hidden md:table-cell">{batch.capacity}</td>
    <td className="hidden md:table-cell">{batch.teacher?.name || "N/A"}</td>
    <td className="hidden md:table-cell">{batch.students.length}</td>
    <td className="hidden md:table-cell">{batch.zoomLink}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="batch" type="update" data={batch} />
            <FormModal table="batch" type="delete" id={batch.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

// Function to fetch batches with teacher and student relations
const fetchBatches = async (searchParams: { [key: string]: string | undefined }) => {
  const { page, ...queryParams } = searchParams;
  const currentPage = page ? parseInt(page) : 1;

  // Initialize query conditions
  const query: Prisma.BatchWhereInput = {};

  // Populate query with search parameters if provided
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "batchId":
            query.id = parseInt(value);
            break;
          case "search":
            query.batchname = { contains: value, mode: "insensitive" };
            break;
          case "teacherId":
            query.teacherId = parseInt(value);
            break;
          default:
            break;
        }
      }
    }
  }

  // Perform the query with relations
  const [batches, totalBatches] = await prisma.$transaction([
    prisma.batch.findMany({
      where: query,
      include: {
        teacher: true,    // Include teacher details
        students: true,   // Include students details
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (currentPage - 1),
    }),
    prisma.batch.count({ where: query }),
  ]);

  return { batches, totalBatches };
};

// Main Batch List Component
const BatchListPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const { batches, totalBatches } = await fetchBatches(searchParams);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Batches</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="batch" type="create" />}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={batches} />

      {/* PAGINATION */}
      
    </div>
  );
};

export default BatchListPage;
