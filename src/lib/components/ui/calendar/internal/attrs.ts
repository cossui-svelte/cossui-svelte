export function boolToStr(condition: boolean): 'true' | 'false' {
  return condition ? 'true' : 'false';
}

export function boolToStrTrueOrUndef(condition: boolean): 'true' | undefined {
  return condition ? 'true' : undefined;
}

export function boolToEmptyStrOrUndef(condition: boolean): '' | undefined {
  return condition ? '' : undefined;
}

class BitsAttrs<T extends readonly string[]> {
  #prefix: string;
  attrs: Record<T[number], string>;

  constructor(config: { component: string; parts: T }) {
    this.#prefix = `data-${config.component}-`;
    this.getAttr = this.getAttr.bind(this);
    this.attrs = Object.fromEntries(
      config.parts.map((part) => [part, this.getAttr(part)])
    ) as Record<T[number], string>;
  }

  getAttr(part: string, variantOverride?: string) {
    if (variantOverride) return `data-${variantOverride}-${part}`;
    return `${this.#prefix}${part}`;
  }
}

export function createBitsAttrs<T extends readonly string[]>(config: {
  component: string;
  parts: T;
}) {
  const bitsAttrs = new BitsAttrs(config);
  return {
    ...bitsAttrs.attrs,
    getAttr: bitsAttrs.getAttr
  };
}
