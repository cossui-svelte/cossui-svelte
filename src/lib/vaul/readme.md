This is autopilot-vaul-svelte
https://github.com/quanghle/autopilot-vaul-svelte last update may 11th 2026
6bb34cc - Merge pull request #20 from quanghle/copilot/fix-close-drawer-timeout-cleanup

with a few changes to fix typescript issues

All 7 changes are in place and verified. Here's a summary of what was done:

and also did a pass of claude code optimization:

#	File	Change
1	snap-points.ts:51	Bug fix — snapPointsOffset now declares direction as a store dependency so it recomputes on direction changes
2	vaul.ts:41	IS_IOS cached at module level; cachedDirection captured in onPress and reused in onDrag/onRelease — eliminates repeated store reads on every pointer event
3	vaul.ts / snap-points.ts	All new Date() / .getTime() replaced with Date.now() — timestamps are now plain numbers throughout
4	vaul.ts:165	NodeJS.Timeout replaced with ReturnType<typeof setTimeout> for browser consistency
5	snap-points.ts:103	snapToPoint accepts optional knownIndex — the effect that triggers it already has the index, skipping the redundant findIndex
6	vaul.ts:771	vaul-scrollable class is now removed on cleanup — previously leaked on every open/close cycle
7	store.ts:101	safeOnDestroy rethrows non-lifecycle errors instead of silently swallowing them



