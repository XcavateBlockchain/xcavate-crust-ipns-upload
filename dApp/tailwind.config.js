/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "graphik-super": 'GraphikSuper',
        "graphik-super-italic": 'GraphikSuperItalic',
        "graphik-black": 'GraphikBlack',
        "graphik-black-italic": 'GraphikBlackItalic',
        "graphik-bold": 'GraphikBold',
        "graphik-bold-italic": 'GraphikBoldItalic',
        "graphik-semibold": 'GraphikSemibold',
        "graphik-semibold-italic": 'GraphikSemiboldItalic',
        "graphik-medium": 'GraphikMedium',
        "graphik-medium-italic": 'GraphikMediumItalic',
        "graphik-regular": 'GraphikRegular',
        "graphik-regular-italic": 'GraphikRegularItalic',
        "graphik-light": 'GraphikLight',
        "graphik-light-italic": 'GraphikLightItalic',
        "graphik-extra-light": 'GraphikExtraLight',
        "graphik-extra-light-italic": 'GraphikExtraLightItalic',
        "graphik-thin": 'GraphikThin',
        "graphik-thin-italic": 'GraphikThinItalic',
        "dmsans-bold": 'DMSansBold',
        "dmsans-bold-italic": 'DMSansBoldItalic',
        "dmsans-medium": 'DMSansMedium',
        "dmsans-medium-italic": 'DMSansMediumItalic',
        "dmsans-regular": 'DMSansRegular',
        "dmsans-regular-italic": 'DMSansRegularItalic',
      },
      colors: {
        "card": '#FEFEFE',
        "frame": '#FAFAFA',
        "verified": '#00C058',
        "progress": '#FF8C00',
        "listed": "#2F8BB2",
        "label": "#D9D9D9",
      },
      textColor: {
        "headers": '#1C1F20',
        "body": '#151719',
        "links": '#005FDB',
        "warning": '#FF000F',
        "placeholder": "#8C8C8C",
      },
      borderColor: {
        "button": '#1C1F20',
        "form": "#151719",
      }
    }
  },
  plugins: [],
}

