const PlaceHolderImage = ({ className = "w-[400px] relative" }) => {
  return (
    <div className={`${className} flex overflow-hidden`}>
      <img
        className="flex h-full w-full object-cover"
        src="/photos/placeholder.jpg"
      />
      <div className="absolute inset-0 bg-yellow-950/60 flex items-center justify-center text-theme-1 p-4">
        Photo Coming Soon
      </div>
    </div>
  );
};

export default PlaceHolderImage;
