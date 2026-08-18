import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Link.module.scss';

type LinkProps = ComponentProps<typeof NextLink>;

export const Link = ({ className, ...props }: LinkProps) => {
  return <NextLink className={cn(styles.link, className)} {...props} />;
};
