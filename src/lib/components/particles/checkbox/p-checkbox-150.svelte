<script lang="ts">
  import MoonIcon from '@lucide/svelte/icons/moon';
  import SunIcon from '@lucide/svelte/icons/sun';

  const id = $props.id();
  let theme = $state('light');
</script>

<div class="space-y-4">
  <legend class="font-medium text-foreground text-sm leading-none">
    Dark mode toggle checkbox
  </legend>
  <div class="flex flex-col justify-center">
    <input
      checked={theme === 'dark'}
      class="peer sr-only"
      {id}
      name={id}
      onchange={() => (theme = theme === 'dark' ? 'light' : 'dark')}
      type="checkbox"
    />
    <label
      aria-label="Switch to {theme === 'dark' ? 'light' : 'dark'} mode"
      class="group relative inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-xs outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground peer-focus-visible:border-ring peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50"
      for={id}
    >
      <MoonIcon
        aria-hidden="true"
        class="shrink-0 scale-0 opacity-0 transition-all group-peer-checked:scale-100 group-peer-checked:opacity-100"
        size={16}
      />
      <SunIcon
        aria-hidden="true"
        class="absolute shrink-0 scale-100 opacity-100 transition-all group-peer-checked:scale-0 group-peer-checked:opacity-0"
        size={16}
      />
    </label>
  </div>
</div>
