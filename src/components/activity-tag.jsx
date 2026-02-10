const ActivityTag = ({ active, className = "" }) => {
  return (
    <span
      className={`${className} flex ${active ? "bg-theme-4 text-theme-1" : "bg-theme-4/60 text-theme-2"} rounded-[50px] px-3 py-1 items-center justify-center`}
    >
      {active ? "ACTIVE" : "INACTIVE"}
    </span>
  );
};

export default ActivityTag;
