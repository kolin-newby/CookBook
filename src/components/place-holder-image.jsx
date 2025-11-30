const PlaceHolderImage = ({ className = "" }) => {
  return (
    <img
      className={`${className} absolute inset-x-0 top-0 h-full w-full object-cover overflow-hidden`}
      src="/photos/placeholder.jpg"
    />
  );
};

export default PlaceHolderImage;
