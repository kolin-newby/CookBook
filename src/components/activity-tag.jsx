const ActivityTag = ({ active, className = "" }) => {
  return (
    <span
      className={`${className} flex bg-theme-4 text-theme-1 rounded-[50px] px-3 py-1 items-center justify-center`}
    >
      {active ? "ACTIVE" : "INACTIVE"}
    </span>
  );
};

export default ActivityTag;
