<script lang="ts">
  import CodeBlockCommand from '$lib/components/app/code-block-command.svelte';
  import PageHeader from '$lib/components/app/page-header.svelte';
  import PageHeaderDescription from '$lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '$lib/components/app/page-header-heading.svelte';
</script>

<div class="container w-full">
  <PageHeader>
    <PageHeaderHeading>AI & REGISTRY</PageHeaderHeading>
    <PageHeaderDescription>
      Published as a shadcn registry, CossUI-Svelte allows an agent to find and create components
      with ease, while giving you full flexibility over the source code.
    </PageHeaderDescription>
  </PageHeader>
  <div>
    <h2 class="mb-4 font-heading font-semibold text-xl">Installation</h2>
    <figure data-rehype-pretty-code-figure>
      <CodeBlockCommand
        __bun__="bunx --bun shadcn-svelte@latest add https://cossui-svelte.com/r/p-button-1.json"
        __npm__="npx shadcn-svelte@latest add https://cossui-svelte.com/r/p-button-1.json"
        __pnpm__="pnpm dlx shadcn-svelte@latest add https://cossui-svelte.com/r/p-button-1.json"
        __yarn__="yarn dlx shadcn-svelte@latest add https://cossui-svelte.com/r/p-button-1.json"
      />
    </figure>
  </div>
</div>
