import React from 'react'
import ReactLoading from "https://cdn.skypack.dev/react-loading@2.0.3";
const ScreenLoading = () => {
  return (
    <>
      <div className="h-[100vh] flex justify-center items-center backdrop-blur-sm z-20 fixed top-0 left-0 right-0" id='loader-container'>
        <ReactLoading
          type={"bars"}
          color={"#E574A5"}
          height={150}
          width={150}
        />
      </div>
    </>
  )
}

export default ScreenLoading