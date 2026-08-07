const DashboardHero = ({
  user = "Administrator",
  subtitle = "Monitor internship applications, approvals, NOC requests, departments and student progress from one centralized dashboard.",
  overviewTitle = "Today's Overview",
  overviewValue = 0,
  overviewText = "Pending Internship Reviews",
  buttonText = "Review Requests",
  onButtonClick,
}) => {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        bg-blue-700
        p-5
        md:p-8
        text-white
        shadow-xl
      "
    >
      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/5"></div>
      <div className="absolute -bottom-20 left-20 h-40 w-40 rounded-full bg-white/5"></div>

      <div
        className="
          relative
          z-10
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-center 
          gap-8
        "
      >
        {/* Welcome Section */}
        <div className="flex-1 min-w-0 w-full text-center flex flex-col items-center">
          <p
            className="
              text-xs
              md:text-sm
              uppercase
              tracking-[2px]
              text-blue-100
              font-semibold
              leading-relaxed
              break-words
            "
          >
            College Internship Management System
          </p>

          <h1
            className="
              mt-4

              text-2xl
              md:text-3xl
              font-extrabold
              leading-snug
              break-words
              whitespace-normal
            "
          >
            Welcome {user}
          </h1>

          <p
            className="
    mt-4
    px-2
    max-w-xl
    mx-auto
    text-center
    text-blue-100
    leading-7
    text-base
  "
          >
            {subtitle}
          </p>
        </div>

        {/* Today's Overview Card */}
        <div
          className="
            w-full
            sm:w-[340px]
            max-w-full
            rounded-2xl
            bg-white/20
            backdrop-blur-md
            p-7
            shadow-lg
            text-center
            flex
            flex-col
            items-center
          "
        >
          <p className="text-blue-100 text-sm font-semibold">{overviewTitle}</p>

          <h2 className="mt-3 text-3xl md:text-4xl leading-none font-extrabold">
            {overviewValue}
          </h2>

          <p className="mt-3 text-blue-100 leading-relaxed text-sm break-words">
            {overviewText}
          </p>

          <button
            onClick={onButtonClick}
            className="
    mt-6
    w-full
    max-w-[260px]
    rounded-xl
    bg-white
    px-5
    py-3
    text-blue-700
    font-bold
    whitespace-nowrap
    hover:bg-slate-100
    transition
  "
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
