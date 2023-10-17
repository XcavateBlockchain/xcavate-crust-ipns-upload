import React from 'react'

const StatusSvgIcon = ({width = 22, height = 22, color = '#FF8C00'}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.44999 13.97C2.51999 17.41 5.39999 20.06 8.97999 20.79M1.04999 9.98C1.30167 7.51663 2.45871 5.23435 4.29695 3.57531C6.1352 1.91627 8.52379 0.998573 11 1C16.18 1 20.44 4.94 20.95 9.98M13.01 20.8C16.58 20.07 19.45 17.45 20.54 14.02" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default StatusSvgIcon
