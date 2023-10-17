import React from 'react'

const HomeSvgIcon = ({width = 17, height = 16, color = "#F5F5F5", opacity = 0.8}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 8.90232V9C14.5 10.8638 14.5 11.7956 14.1955 12.5307C13.7895 13.5108 13.0108 14.2895 12.0307 14.6955C11.2956 15 10.9496 15 10.2574 15C7.22202 15 5.70435 15 4.96927 14.6955C3.98915 14.2895 3.21046 13.5108 2.80448 12.5307C2.5 11.7956 2.5 10.8638 2.5 9V8.90232C2.5 7.92466 2.5 7.43583 2.60806 6.98041C2.73861 6.4302 2.98435 5.91391 3.32905 5.46562C3.61436 5.09458 3.99375 4.78633 4.75253 4.16982L8.5 1.125L12.2475 4.16982L12.2475 4.16983C13.0063 4.78633 13.3856 5.09458 13.6709 5.46562C14.0157 5.91391 14.2614 6.4302 14.3919 6.98041C14.5 7.43583 14.5 7.92466 14.5 8.90232Z" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="0.8" y1="-0.8" x2="10.0879" y2="-0.8" transform="matrix(-0.757719 0.652581 -0.757719 -0.652581 8.5 0)" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="0.8" y1="-0.8" x2="10.0879" y2="-0.8" transform="matrix(0.757719 0.652581 0.757719 -0.652581 8.5 0)" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="6.95" y1="11.9309" x2="9.675" y2="11.9309" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export default HomeSvgIcon
