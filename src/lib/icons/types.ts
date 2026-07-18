import type { SVGAttributes } from 'svelte/elements';

type TitleType = {
  id?: string;
  title?: string;
};
type DescType = {
  id?: string;
  desc?: string;
};
export interface BaseProps extends SVGAttributes<SVGElement> {
  color?: string;
  focusable?: 'true' | 'false' | 'auto';
  role?: string;
  size?: string;
}
export interface Props extends BaseProps {
  ariaLabel?: string;
  desc?: DescType;
  title?: TitleType;
}
