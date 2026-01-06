import React from "react";

const About = () => {
  return (
    <div className="flex w-full h-full p-2 items-center justify-center">
      <div className="flex w-1/3 relative">
        {/* <img
          src="/public/photos/JZ.jpg"
          className="max-w-[600px] rounded-[200px] object-cover aspect-square"
        /> */}
        <div className="flex rounded-[200px] bg-theme-3 p-5 transform">
          <div className="flex aspect-square max-w-[600px] w-full rounded-[200px] overflow-hidden">
            <img src="/photos/KF.jpg" className=" object-cover size-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-linear-to-br from-theme-2 to-theme-2/20 inset-shadow-xs rounded-[50px] px-10 py-6 text-theme-5 max-w-1/3 space-y-6 text-base md:text-lg">
        <span>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here. This is a short exerpt on what this
          website is and who it is for...maybe say hi to some of our friends or
          maybe even explain what kind of recipes are on here.
        </span>
        <span>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here.
        </span>
        <span>
          This is a short exerpt on what this website is and who it is
          for...maybe say hi to some of our friends or maybe even explain what
          kind of recipes are on here. This is a short exerpt on what this
          website is and who it is for...maybe say hi to some of our friends or
          maybe even explain what kind of recipes are on here. This is a short
          exerpt on what this website is and who it is for...maybe say hi to
          some of our friends or maybe even explain what kind of recipes are on
          here.
        </span>
      </div>
    </div>
  );
};

export default About;
