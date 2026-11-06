<script lang="ts">
  import CodeBlockCommand from '#lib/components/app/code-block-command.svelte';
  import PageHeaderDescription from '#lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '#lib/components/app/page-header-heading.svelte';
  import PageHeader from '#lib/components/app/page-header.svelte';
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
  <div class="mt-10">
    <h2 class="mb-4 font-heading font-semibold text-xl">Using it from your project</h2>
    <p class="mb-4 text-muted-foreground text-sm">
      Run the command from the root of a project that has a <code>components.json</code>. Registry
      dependencies (such as <code>utils</code> or <code>spinner</code>) are resolved from this
      registry automatically, imports are rewritten to your <code>$lib</code> alias, and files land
      in the folders configured in your aliases. Add <code>--overwrite</code> to replace existing
      files without being prompted, and <code>--yes</code> to skip confirmations.
    </p>
    <figure data-rehype-pretty-code-figure>
      <CodeBlockCommand
        __bun__="bunx --bun shadcn-svelte@latest add https://cossui-svelte.com/r/button.json --yes --overwrite"
        __npm__="npx shadcn-svelte@latest add https://cossui-svelte.com/r/button.json --yes --overwrite"
        __pnpm__="pnpm dlx shadcn-svelte@latest add https://cossui-svelte.com/r/button.json --yes --overwrite"
        __yarn__="yarn dlx shadcn-svelte@latest add https://cossui-svelte.com/r/button.json --yes --overwrite"
      />
    </figure>
  </div>
</div>
