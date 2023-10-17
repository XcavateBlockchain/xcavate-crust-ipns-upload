import React from "react";

export const TermsAndCondition = () => {
  return (
    <>
      <div className="w-[100vw] h-[100%] flex justify-center items-center fixed top-0 left-0 backdrop-blur-sm overflow-hidden z-50 ">
        <div className="w-full p-4 sm:p-6">
          <main className="wrap">
            <section className="terms px-5 py-4">
              <div className="terms__heading">
                <h2 className=" font-graphik-bold text-[28px]">
                  {`Terms of use`}
                </h2>
              </div>
              <div className="terms__content font-graphik-regular text-lg text-body opacity-[0.7]">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero. Sed cursus ante dapibus
                  diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
                  Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
                  augue semper porta. Mauris massa. Vestibulum lacinia arcu eget
                  nulla. Class aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos. Curabitur sodales
                  ligula in libero. Sed dignissim lacinia nunc.{" "}
                </p>
                <p>
                  Curabitur tortor. Pellentesque nibh. Aenean quam. In
                  scelerisque sem at dolor. Maecenas mattis. Sed convallis
                  tristique sem. Proin ut ligula vel nunc egestas porttitor.
                  Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
                  massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
                  ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
                  euismod in, nibh. Quisque volutpat condimentum velit.{" "}
                </p>
                <p>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia,
                  urna non tincidunt mattis, tortor neque adipiscing diam, a
                  cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
                  Suspendisse potenti. Nunc feugiat mi a tellus consequat
                  imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
                  Suspendisse in justo eu magna luctus suscipit.{" "}
                </p>
                <p>
                  Sed lectus. Integer euismod lacus luctus magna. Quisque
                  cursus, metus vitae pharetra auctor, sem massa mattis sem, at
                  interdum magna augue eget diam. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Morbi lacinia molestie dui. Praesent blandit dolor. Sed non
                  quam. In vel mi sit amet augue congue elementum. Morbi in
                  ipsum sit amet pede facilisis laoreet. Donec lacus nunc,
                  viverra nec, blandit vel, egestas et, augue. Vestibulum
                  tincidunt malesuada tellus. Ut ultrices ultrices enim.
                  Curabitur sit amet mauris.{" "}
                </p>
                <p>
                  Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.
                  Integer lacinia sollicitudin massa. Cras metus. Sed aliquet
                  risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis,
                  venenatis tristique, dignissim in, ultrices sit amet, augue.
                  Proin sodales libero eget ante. Nulla quam. Aenean laoreet.{" "}
                </p>
              </div>
              <div className=" flex flex-row items-center justify-end font-graphik-regular text-base text-body mt-10">
                <h5 className=" mr-4">
                  {`By clicking 'Accept' you are agreeing to our terms and conditions.`}
                </h5>
                <button className=" flex flex-row items-center justify-center w-[120px] h-[40px] rounded bg-gradient-to-r from-[#E574A5_32.81%] via-[#354E78_67.73%] to-[#2F8BB2_100%]">
                  <h5 className=" font-graphik-regualar text-white text-base">
                    {`Accept`}
                  </h5>
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
