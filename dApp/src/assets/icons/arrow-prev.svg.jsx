import React from 'react'

const ArrowPrevSvgIcon = ({ width = 24, height = 24, color = "#0F0F0F" }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="arrow-prev">
        <path id="icon" d="M16.1794 3.26875C15.7889 2.87823 15.1557 2.87823 14.7652 3.26875L8.12075 9.91322C6.94949 11.0845 6.94913 12.9833 8.11993 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53243 12.7442C9.14191 12.3536 9.14191 11.7205 9.53243 11.33L16.1794 4.68297C16.5699 4.29244 16.5699 3.65928 16.1794 3.26875Z" fill={color} />
      </g>
    </svg>
  )
}

export default ArrowPrevSvgIcon

