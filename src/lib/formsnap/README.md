this is a modified version of formsnap which allows for this construct

```
<form method="POST" use:enhance novalidate>
    <Field form={sf} name="name">
        <Label>Name</Label>
        <Control>
            {#snippet children({ props })}
                <input type="text" bind:value={$form.name} {...props} />
            {/snippet}
        </Control>
        <FieldErrors />
    </Field>
</form>
```

typically the <Label> would need to be inside <Control>