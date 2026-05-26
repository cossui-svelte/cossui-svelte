// from cossui

type Options = {
  timeout: number;
  onCopy?: () => void;
};

export class UseCopyToClipboard {
  #isCopied = $state(false);
  #timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;
  timeout: number;
  onCopy?: () => void;

  constructor({ timeout = 2000, onCopy }: Partial<Options> = {}) {
    this.timeout = timeout;
    this.onCopy = onCopy;
  }

  copyToClipboard(value: string): void {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) return;
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      if (this.#timeoutId) {
        clearTimeout(this.#timeoutId);
      }

      this.#isCopied = true;
      this.onCopy?.();

      if (this.timeout !== 0) {
        this.#timeoutId = setTimeout(() => {
          this.#isCopied = false;
          this.#timeoutId = undefined;
        }, this.timeout);
      }
    }, console.error);
  }

  get isCopied(): boolean {
    return this.#isCopied;
  }
}
