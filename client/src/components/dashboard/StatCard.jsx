const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-6
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        overflow-hidden
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-5
        "
      >
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p
            className="
              text-sm
              font-bold
              text-slate-500
              uppercase
              tracking-wide
              leading-relaxed
              break-words
              pr-2
            "
          >
            {title}
          </p>

          <h2
            className="
              
              mt-4
              text-3xl
              font-extrabold
              text-slate-800
              
            "
          >
            {value}
          </h2>
        </div>

        {/* Icon */}

        <div
          className={`
            ${iconBg}
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            flex-shrink-0
          `}
        >
          <Icon size={28} className={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
