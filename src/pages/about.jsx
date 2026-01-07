import React from "react";

const About = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full h-full p-6 pb-12 items-center justify-center">
      <div className="flex flex-row sm:flex-col w-full sm:w-1/2 md:w-1/2 items-center justify-center">
        <div className="relative flex p-2 w-1/2 max-w-[220px] sm:w-full aspect-square">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-20 sm:border-40 border-theme-3 animate-spin-xslow" />
          <img
            src="/photos/JZ.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
        <div className="relative flex p-2 w-1/2 max-w-[220px] sm:w-full aspect-square">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-20 sm:border-40 border-theme-4 animate-spin-xslow-reverse" />
          <img
            src="/photos/KF.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
      </div>
      <article className="max-h-full space-y-3 rounded-[50px] bg-linear-to-br from-theme-2/70 to-theme-2/20 py-4 px-6 overflow-y-scroll flex-col inset-shadow-sm text-theme-5 sm:max-w-2/3 w-full sm:w-full sm:space-y-4 text-sm sm:text-base md:text-lg">
        <p>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here. This is a short exerpt on what this
          website is and who it is for...maybe say hi to some of our friends or
          maybe even explain what kind of recipes are on here.
        </p>
        <p>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here.
        </p>
        <p>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here. This is a short exerpt on what this
          website is and who it is for...maybe say hi to some of our friends or
          maybe even explain what kind of recipes are on here. This is a short
          exerpt on what this website is and who it is for...maybe say hi to
          some of our friends or maybe even explain what kind of recipes are on
          here.
        </p>
      </article>
    </div>
  );
};

export default About;
