import { SVGType } from './types';

export const Arrow = (props: SVGType) => {
  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden
      {...props}
    >
      <path
        d='M4.08301 9.91668L9.91634 4.08334'
        stroke='white'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.08301 4.08334H9.91634V9.91668'
        stroke='white'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
