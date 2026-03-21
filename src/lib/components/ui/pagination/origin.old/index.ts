/* eslint-disable perfectionist/sort-named-exports */

import Root from './pagination.svelte';
import Content from './pagination-content.svelte';
import Ellipsis from './pagination-ellipsis.svelte';
import Item from './pagination-item.svelte';
import Link from './pagination-link.svelte';
import NextButton from './pagination-next-button.svelte';
import PrevButton from './pagination-prev-button.svelte';

export {
  Content,
  Content as PaginationContent,
  Ellipsis,
  Ellipsis as PaginationEllipsis,
  Item,
  Item as PaginationItem,
  Link,
  Link as PaginationLink,
  NextButton,
  NextButton as PaginationNextButton,
  PrevButton,
  PrevButton as PaginationPrevButton,
  Root,
  //
  Root as Pagination
};
