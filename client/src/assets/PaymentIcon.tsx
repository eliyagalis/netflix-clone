import React from 'react';

interface PaymentIconProps extends React.SVGProps<SVGSVGElement> {}

const PaymentIcon: React.FC<PaymentIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    role="img"
    viewBox="0 0 36 36"
    width="40"
    height="40"
    data-icon="RedirectBrowserLarge"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 7C0.89543 7 0 7.89543 0 9V27C0 28.1046 0.895431 29 2 29H20C21.1046 29 22 28.1046 22 27V22H20V27H2V9L20 9V14H22V9C22 7.89543 21.1046 7 20 7H2ZM16 17L32.5858 17L28.2929 12.7071L29.7071 11.2929L35.7071 17.2929C35.8946 17.4804 36 17.7348 36 18C36 18.2652 35.8946 18.5196 35.7071 18.7071L29.7071 24.7071L28.2929 23.2929L32.5858 19L16 19V17ZM18 13.5H8V11.5H18V13.5ZM6 11.5H4V13.5H6V11.5Z"
      fill="currentColor"
    />
  </svg>
);

export default PaymentIcon;
