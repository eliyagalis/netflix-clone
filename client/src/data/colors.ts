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
      lightGray: 'text-[#737373]'
    },
    background: {
      primary: 'bg-[#e50914]',
      lightWhite: 'bg-[#f3f3f3]',
      lightGray: 'bg-[#737373]',
      darkGray: 'bg-[#0f0f0f]',

    },
    plans: {
      basic: "bg-[radial-gradient(140.76%_131.96%_at_100%_100%,_rgb(109,59,227)_0%,_rgba(74,42,150,0.5)_73.57%,_rgba(74,42,150,0)_100%),_rgb(29,82,157)]",
      standard: "bg-[radial-gradient(140.76%_131.96%_at_100%_100%,_rgb(176,56,220)_0%,_rgba(74,42,150,0.5)_73.57%,_rgba(74,42,150,0)_100%),_rgb(29,82,157)]",
      premium: "bg-[radial-gradient(140.76%_131.96%_at_100%_100%,_rgb(229,9,20)_0%,_rgba(74,42,150,0.5)_73.57%,_rgba(74,42,150,0)_100%),_rgb(29,82,157)]",
    }
  };
  
  export type ColorProps = {
    bg: string;
    hover: string;
    text: string;
  };