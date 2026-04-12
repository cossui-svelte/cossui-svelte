import type { Snippet } from 'svelte';
import Button from './button.svelte';
import {
  //TODO do we need to export this?
  type ButtonSize,
  type ButtonVariant,
  type ButtonVariants,
  buttonVariants
} from './button-variants';

export type ButtonProps = {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  class?: string;
  children?: Snippet;
  loading?: boolean;
};

export { Button, type ButtonSize, type ButtonVariant, type ButtonVariants, buttonVariants };
