import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import cn from 'classnames';
import styles from './Link.module.scss';

type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: 'link' | 'primary' | 'default';
  size?: 'medium' | 'large';
};

export const Link = ({ className, variant = 'link', size = 'medium', ...props }: LinkProps) => {
  return (
    <NextLink
      className={cn(variant === 'link' ? styles.link : styles[variant], size === 'large' && styles.large, className)}
      {...props}
    />
  );
};
