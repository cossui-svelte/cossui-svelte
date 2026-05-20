<script>
import {
  Popover,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger
} from '$lib/components/ui/popover';
</script>

<Popover>
    <PopoverTrigger>Open Popover</PopoverTrigger>
    <PopoverPopup class="w-80">
        <div class="mb-4">
            <PopoverTitle className="text-base">Send us feedback</PopoverTitle>
            <PopoverDescription>
                Let us know how we can improve.
            </PopoverDescription>
        </div>
        <!-- TODO <Form>
            <Field>
                <Textarea
                    aria-label="Send feedback"
                    id="feedback"
                    placeholder="How can we improve?"
                />
            </Field>
            <Button type="submit">Send feedback</Button>
        </Form> -->
    </PopoverPopup>
</Popover>
