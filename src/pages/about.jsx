import React from "react";

const About = () => {
  return (
    <div className="flex flex-col sm:flex-row w-full h-full p-10 space-x-6 items-center justify-center">
      {/* <div className="relative flex w-full sm:w-1/3 sm:h-full max-h-[700px]">
        <div className="flex relative p-6 max-w-1/2 w-full aspect-square self-end sm:self-auto">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-34 sm:border-40 border-theme-3 animate-spin-xslow" />
          <img
            src="/photos/KF.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
        <div className="flex relative aspect-square p-6 max-w-1/2 self-start sm:self-auto">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-34 sm:border-40 border-theme-4 animate-spin-xslow-reverse" />
          <img
            src="/photos/JZ.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
      </div> */}
      <article className="max-h-full overflow-y-scroll flex-col px-2 py-4 text-theme-5 sm:max-w-2/3 w-full flex-1 sm:space-y-4 text-sm sm:text-base md:text-lg text-wrap">
        <div className="relative float-left p-3 mr-3 w-1/2 aspect-square">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-20 sm:border-40 border-theme-3 animate-spin-xslow" />
          <img
            src="/photos/JZ.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
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
        <div className="relative float-right p-3 mr-3 w-1/2 aspect-square">
          <div className="absolute top-0 left-0 w-full h-full rounded-[40%] border-20 sm:border-40 border-theme-4 animate-spin-xslow-reverse" />
          <img
            src="/photos/KF.jpg"
            className=" object-cover size-full rounded-[40%]"
          />
        </div>
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
