import React from "react";

const CompanyCredential = () => {
  return (
    <>
      <h1 className="text-md font-bold text-center mt-[8rem] text-2xl">
        Company Credentials
      </h1>
      <div className="container m-auto flex justify-center items-center flex-col h-[100%] mt-5">
        <div className="py-10 px-10 rounded-sm bg-white w-[60%]">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                DID Hash/ Web3 name
              </label>
              <input
                type="number"
                id="ptitle"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="Nikku Apartment"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Registration number
              </label>
              <input
                type="number"
                id="ptype"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="House , Apartment , Land"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-1 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Company name
              </label>
              <input
                type="text"
                id="ptitle"
                className=" bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="Nikku Apartment"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Company email
              </label>
              <input
                type="number"
                id="ptitle"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="Nikku Apartment"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Company telephone number
              </label>
              <input
                type="number"
                id="ptype"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="House , Apartment , Land"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-1 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Address
              </label>
              <input
                type="text"
                id="ptitle"
                className=" bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="Nikku Apartment"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Associate membership Number
              </label>
              <input
                type="number"
                id="ptitle"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="Nikku Apartment"
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-black"
              >
                Associate Website
              </label>
              <input
                type="number"
                id="ptype"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:-light"
                placeholder="House , Apartment , Land"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="flex justify-center flex-col">
              <label
                htmlFor="id"
                className="block mb-4 text-sm font-bold text-gray-900 dark:text-black "
              >
                ID doc 1 (Driving license/ passport)
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-34 px-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div className="flex justify-center flex-col mx-3">
              <label
                htmlFor="id"
                className="block mb-4 text-sm font-bold text-gray-900 dark:text-black "
              >
                ID doc 2 Utility bill (within 3 months)
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-34 px-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-white button rounded-md w-full mt-10 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold  text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
          >
            Verify Company
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyCredential;
