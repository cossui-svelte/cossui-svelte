<script lang="ts">
  import PageHeader from '$lib/components/app/page-header.svelte';
  import PageHeaderDescription from '$lib/components/app/page-header-description.svelte';
  import PageHeaderHeading from '$lib/components/app/page-header-heading.svelte';
  import CodeBlockCommand from '$lib/components/app/code-block-command.svelte';
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
    <h2 class="mb-4 font-heading font-semibold text-xl">Before you start</h2>
    <p>You need a proper SvelteKit project with Tailwind 4 and a components.json.</p>

    <p>Add tailwind 4:</p>
    <figure data-rehype-pretty-code-figure>
      <CodeBlockCommand
        __bun__="bunx sv add tailwindcss"
        __npm__="npx sv add tailwindcss"
        __pnpm__="pnpm dlx sv add tailwindcss"
        __yarn__="yarn dlx sv add tailwindcss"
      />
    </figure>
    <p>Then create the components.json:</p>
    <figure data-rehype-pretty-code-figure>
      <CodeBlockCommand
        __bun__="bunx shadcn-svelte@latest init"
        __npm__="npx shadcn-svelte@latest init"
        __pnpm__="pnpm dlx shadcn-svelte@latest init"
        __yarn__="yarn dlx shadcn-svelte@latest init"
      />
    </figure>
  </div>
</div>
