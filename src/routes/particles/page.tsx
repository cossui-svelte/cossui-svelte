import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@coss/ui/shared/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { isValidRegistryCategory } from "@/registry/registry-categories";
import { particles } from "@/registry/registry-particles";
import { ParticlesDisplay } from "./particles-display";
import SearchContainer from "./search-container";

const particleCount = particles.length;

const description = `Discover ${particleCount} ready-to-use particles, the building blocks of your design system. Filter by category to find the perfect component for your project.`;

export const metadata: Metadata = {
  description,
  title: "Browse Particles - coss ui",
};

async function ParticlesDisplayServer({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}) {
  const params = await searchParams;
  const rawCategories = params.tags?.split(",").filter(Boolean) || [];

  // Separate valid and invalid categories
  const validCategories = rawCategories.filter((category) =>
    isValidRegistryCategory(category),
  );
  const invalidCategories = rawCategories.filter(
    (category) => !isValidRegistryCategory(category),
  );

  // If there are invalid categories, show "no components found" message
  if (invalidCategories.length > 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          No particles found for the selected filters
        </p>
      </div>
    );
  }

  // If no valid categories, don't render anything
  if (validCategories.length === 0) return null;

  return <ParticlesDisplay selectedCategories={validCategories} />;
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}) {
  return (
    <div className="container w-full">
      <PageHeader className="*:pb-8!">
        <PageHeaderHeading>Browse Particles</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {description}
        </PageHeaderDescription>
      </PageHeader>
      <Suspense>
        <SearchContainer />
      </Suspense>
      <Suspense>
        <ParticlesDisplayServer searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
