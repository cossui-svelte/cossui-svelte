import { Button } from "@coss/ui/components/button";
import Link from "next/link";

export function SiteCta() {
  return (
    <section>
      <div className="container flex w-full items-center justify-center gap-2 px-4 sm:px-6">
        <Button
          render={
            // biome-ignore lint(a11y/useAnchorContent): knwon
            <a
              href="https://i.cal.com/forms/0129f2a8-7b15-4850-b3fb-07944dfacb3c"
              rel="noreferrer"
              target="_blank"
            />
          }
        >
          Join the waitlist
        </Button>
        <Button render={<Link href="https://cal.com/jobs" />} variant="outline">
          Join the company
        </Button>
      </div>
    </section>
  );
}
