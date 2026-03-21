import Root from './pagination.svelte';
import Content from './pagination-content.svelte';
import Ellipsis from './pagination-ellipsis.svelte';
import Item from './pagination-item.svelte';
import Link from './pagination-link.svelte';
import Next from './pagination-next.svelte';
import NextButton from './pagination-next-button.svelte';
import PrevButton from './pagination-prev-button.svelte';
import Previous from './pagination-previous.svelte';

export {
  Content,
  Content as PaginationContent,
  Ellipsis,
  Ellipsis as PaginationEllipsis,
  Item,
  Item as PaginationItem,
  Link,
  Link as PaginationLink,
  Next,
  Next as PaginationNext,
  NextButton, // old
  NextButton as PaginationNextButton, // old
  PrevButton, // old
  PrevButton as PaginationPrevButton, // old
  Previous,
  Previous as PaginationPrevious,
  Root,
  //
  Root as Pagination
};
