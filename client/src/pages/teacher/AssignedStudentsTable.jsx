import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const AssignedStudentsTable = ({ students }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Student
              </th>

              <th className="px-5 py-4 text-left">
                Roll Number
              </th>

              <th className="px-5 py-4 text-left">
                Email
              </th>

              <th className="px-5 py-4 text-left">
                Semester
              </th>

              <th className="px-5 py-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {students.length > 0 ? (
              students.map((student) => (

                <tr
                  key={student._id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-5 py-4 font-medium">
                    {student.name}
                  </td>

                  <td className="px-5 py-4">
                    {student.rollNumber}
                  </td>

                  <td className="px-5 py-4">
                    {student.email}
                  </td>

                  <td className="px-5 py-4">
                    {student.semester}
                  </td>

                  <td className="px-5 py-4 text-center">

                    <Link
                      to={`/teacher/student/${student._id}`}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-lg
                        bg-blue-600
                        text-white
                        hover:bg-blue-700
                      "
                    >
                      <Eye size={16} />
                      View
                    </Link>

                  </td>

                </tr>

              ))
            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-500"
                >
                  No students found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AssignedStudentsTable;