const PlaceHolderImage = ({ className = "w-[400px] relative" }) => {
  return (
    <div className={`${className} flex overflow-hidden`}>
      <img className="flex" src="/photos/placeholder.jpg" />
      <div className="absolute inset-0 bg-yellow-950/60 flex items-center justify-center text-theme-1 object-cover">
        Photo Coming Soon
      </div>
    </div>
  );
};

export default PlaceHolderImage;
