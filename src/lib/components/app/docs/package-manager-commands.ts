export interface PackageManagerCommands {
  bun: string;
  npm: string;
  pnpm: string;
  yarn: string;
}

export const SHELL_LANGS = new Set(['bash', 'sh', 'shell']);

/**
 * Expands one npm-family command into its npm/pnpm/yarn/bun equivalents, or
 * returns undefined when the command isn't an install or package-runner call.
 */
export function toPackageManagerCommands(command: string): PackageManagerCommands | undefined {
  const install = command.match(/^npm (?:install|i)\b(.*)$/);
  if (install) {
    const args = install[1].replace(/(^|\s)--save-dev(?=\s|$)/, '$1-D');
    if (!args.trim()) {
      return { bun: 'bun install', npm: command, pnpm: 'pnpm install', yarn: 'yarn install' };
    }
    return {
      bun: `bun add${args}`,
      npm: command,
      pnpm: `pnpm add${args}`,
      yarn: `yarn add${args}`
    };
  }

  const run = command.match(/^(?:npx|pnpm dlx|pnpx|yarn dlx|bunx(?: --bun)?) (.+)$/);
  if (run) {
    const args = run[1];
    return {
      bun: `bunx --bun ${args}`,
      npm: `npx ${args}`,
      pnpm: `pnpm dlx ${args}`,
      yarn: `yarn dlx ${args}`
    };
  }

  return undefined;
}
