export const colors = {
    buttons:{
      primary: {
        bg: 'bg-[#e50914]',
        hover: 'hover:bg-[#c8000a]',
        text: 'text-white',
      },
      secondary: {
        bg: 'bg-white',
        hover: 'hover:bg-[#cecece]',
        text: 'text-[rgb(15,15,15)]',
      },
    },
    text: {
      primary: 'text-black',
      secondary: 'text-[#e50914]',
      tertiary: 'text-[#ffffff]',
    }
  };
  
  export type ColorProps = {
    bg: string;
    hover: string;
    text: string;
  };