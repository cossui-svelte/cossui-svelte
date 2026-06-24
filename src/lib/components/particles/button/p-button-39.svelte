<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  let open = $state(false);
</script>

<Button
  aria-expanded={open}
  aria-label={open ? "Close menu" : "Open menu"}
  onclick={() => (open = !open)}
  size="icon"
  variant="outline"
>
  <svg
    aria-hidden="true"
    class="pointer-events-none"
    fill="none"
    height={16}
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="origin-center in-[[data-slot=button][aria-expanded=true]]:translate-x-0 -translate-y-[7px] in-[[data-slot=button][aria-expanded=true]]:translate-y-0 in-[[data-slot=button][aria-expanded=true]]:rotate-315 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
      d="M4 12L20 12"
    />
    <path
      class="origin-center in-[[data-slot=button][aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
      d="M4 12H20"
    />
    <path
      class="origin-center in-[[data-slot=button][aria-expanded=true]]:translate-y-0 translate-y-[7px] in-[[data-slot=button][aria-expanded=true]]:rotate-135 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"
      d="M4 12H20"
    />
  </svg>
</Button>
