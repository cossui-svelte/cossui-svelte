import { getContext, setContext } from 'svelte';
import type { AvailableCOSSUIComponent } from '$data/api/components/components.handler';

const COMPONENT_DIALOG_CTX_KEY = Symbol('ctx:component-dialog');

type ComponentDialogProps = {
  component?: AvailableCOSSUIComponent;
};

class ComponentDialog {
  #component = $state<ComponentDialogProps['component']>();

  constructor(props: ComponentDialogProps) {
    this.#component = props.component;
  }

  get component() {
    return this.#component;
  }

  reset() {
    this.#component = undefined;
  }

  setComponent(component: AvailableCOSSUIComponent) {
    this.#component = component;
  }
}

export const setComponentDialogCtx = (props: ComponentDialogProps) => {
  return setContext(COMPONENT_DIALOG_CTX_KEY, new ComponentDialog(props));
};

export const getComponentDialogCtx = (): ComponentDialog => {
  return getContext<ReturnType<typeof setComponentDialogCtx>>(COMPONENT_DIALOG_CTX_KEY);
};
