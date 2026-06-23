import { cache, Suspense } from "react";
import { Index } from "@/registry/__index__";
import { Skeleton } from "@/registry/default/ui/skeleton";
import type { RegistryCategory } from "@/registry/registry-categories";
import { ParticleCard } from "./particle-card";
import { ParticleCardContainer } from "./particle-card-container";

type Particle = {
  name: string;
  categories?: RegistryCategory[];
  registryDependencies?: string[];
  meta?: { className?: string; colSpan?: number };
};

function calculateRelevanceWeight(
  particle: Particle,
  searchTerms: RegistryCategory[],
): number {
  let weight = 0;

  for (const term of searchTerms) {
    const normalizedTerm = term.replace(/\s+/g, "-");

    if (particle.name.startsWith(`p-${normalizedTerm}-`)) {
      weight += 30;
    }

    const deps = particle.registryDependencies ?? [];
    if (deps.some((dep) => dep === `@coss/${normalizedTerm}`)) {
      weight += 20;
    }

    const categories = particle.categories ?? [];
    if (categories[0] === term) {
      weight += 10;
    }
  }

  return weight;
}

function ParticleCardSkeleton({ className }: { className?: string }) {
  return (
    <ParticleCardContainer
      className={className}
      footer={
        <>
          <div className="flex flex-1 gap-1">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-7" />
            <Skeleton className="h-7 w-20" />
          </div>
        </>
      }
    >
      <Skeleton className="h-7 w-64" />
    </ParticleCardContainer>
  );
}

// Cache the particles array to avoid recomputing on every render
const getParticles = cache(() => {
  return Object.values(Index).filter(
    (item) => item.type === "registry:block",
  ) as Particle[];
});

export async function ParticlesDisplay({
  selectedCategories,
}: {
  selectedCategories: RegistryCategory[];
}) {
  const particles = getParticles();

  const filteredParticles = particles
    .filter((particle) => {
      const categories = particle.categories ?? [];
      return selectedCategories.every((value) => categories.includes(value));
    })
    .sort((a, b) => {
      const weightA = calculateRelevanceWeight(a, selectedCategories);
      const weightB = calculateRelevanceWeight(b, selectedCategories);
      return weightB - weightA;
    });

  if (filteredParticles.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          No particles found for the selected filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 items-stretch gap-9 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-9">
      {filteredParticles.map((particle) => {
        const className = particle.meta?.className as string | undefined;
        const colSpan = particle.meta?.colSpan as number | undefined;
        return (
          <Suspense
            fallback={<ParticleCardSkeleton className={className} />}
            key={particle.name}
          >
            <ParticleCard
              className={className}
              colSpan={colSpan}
              name={particle.name}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
