import { Link } from "react-router-dom";

const QuickAction1 = ({ actions }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-3">
        Quick Actions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <Link
              key={index}
              to={action.link}
              className="
              bg-white
              border
              border-slate-200
              rounded-xl
              shadow-sm
              p-5
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-200
            "
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${action.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAction1;
