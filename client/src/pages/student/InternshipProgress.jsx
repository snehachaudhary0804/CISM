const steps = [
  "Applied",
  "Teacher Approval",
  "NOC Issued",
  "Internship Started",
  "Completed",
];

const InternshipProgress = () => {
  return (
    <div
      className="
bg-white
border
rounded-2xl
p-6
"
    >
      <h2
        className="
font-bold
text-lg
mb-6
"
      >
        Internship Progress
      </h2>

      <div
        className="
flex
justify-between
"
      >
        {steps.map((step, index) => (
          <div
            key={step}
            className="
flex
flex-col
items-center
"
          >
            <div
              className="
w-10
h-10
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
"
            >
              {index + 1}
            </div>

            <p
              className="
text-sm
mt-2
text-center
"
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipProgress;
