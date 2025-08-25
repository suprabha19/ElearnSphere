import React from "react";

const AIKnowledgebase = () => {
  const tags = [
    "Presale Chat",
    "Javascript",
    "Documentations",
    "React",
    "Courses",
    "Elearn Help",
  ];

  return (
    <section className="w-full h-full bg-gradient-to-b from-[#141a49] to-[#3a1453] text-white py-16 px-6 mt-0 md:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between mt-30 gap-10">
        {/* Left Side: Content */}
        <div className="w-full lg:w-2/3 text-center lg:text-left ">
          <p className="text-[16px] text-white space-y-2">
            Documentation and user guides for ElearnSphere
          </p>

          <h2 className="text-[62px] font-bold leading-tight mb-8">
            How can we <span className="text-[#6dd6b3]">help you?</span>
          </h2>

          {/* Search box */}
          <div className="flex w-full max-w-md mx-auto lg:mx-0 bg-white rounded-2xl">
            <input
              type="text"
              placeholder="Type your message here ..."
              className="w-full p-4 rounded-l-md text-black focus:outline-none"
            />
            <button className="bg-[#6dd6b3] px-6 py-4 rounded-r-md font-semibold text-white hover:bg-[#6dd695]">
              Submit
            </button>
          </div>

          {/* ChatGPT powered (left aligned now) */}
          <div className="flex justify-start items-center gap-2 pl-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="ChatGPT"
              className="w-5 h-5 mt-10"
            />
            <p className="text-xs text-gray-400 mt-10">
              Search powered by ChatGPT
            </p>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2">
          <img
            src="images/bg-home-2-img.png"
            alt="Knowledgebase Illustration"
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AIKnowledgebase;
