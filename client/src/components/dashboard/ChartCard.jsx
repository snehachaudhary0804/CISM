const ChartCard = ({ title, subtitle, children }) => {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-all
        hover:-translate-y-1
        duration-300
        overflow-hidden
      "
    >
      {/* Header */}
      <div
        className="
          px-6
          py-5
          border-b
          border-slate-100
          flex
          flex-col
         items-center
         text-center
         gap-2
         min-w-0
        "
      >
        <h2
          className="
         text-lg
         md:text-xl
         font-extrabold
         text-slate-900
         break-words
         whitespace-normal
         leading-snug
         max-w-full

  "
        >
          {" "}
          {title}
        </h2>

        {subtitle && (
          <p
            className="
                text-sm
              text-slate-500
               leading-snug
               max-w-full
              break-words
              whitespace-normal
              "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Chart Area */}

      <div
        className="
        overflow-hidden
          h-[330px]
          p-6
          flex
          items-center
          justify-center
        "
      >
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
