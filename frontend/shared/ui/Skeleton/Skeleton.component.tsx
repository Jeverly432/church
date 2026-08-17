import cn from 'classnames';
import { FC, HTMLAttributes } from 'react';
import styles from './Skeleton.module.scss';

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn(styles.skeleton, className)} {...props} />;
};
