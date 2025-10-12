const PlaceHolderImage = ({ className = "w-[400px]" }) => {
  return (
    <div className={`${className} flex relative overflow-hidden rounded-full`}>
      <img className="flex" src="/photos/placeholder.jpg" />
      <div className="absolute inset-0 bg-yellow-950/60 flex items-center justify-center text-theme-1">
        Photo Coming Soon
      </div>
    </div>
  );
};

export default PlaceHolderImage;
