import CheckboxGroup from '../checkbox-group/checkbox-group.svelte';
import CheckboxTree from '../checkbox-group/checkbox-tree.svelte';


export interface CheckBoxTreeNode {
    children?: CheckBoxTreeNode[];
    defaultChecked?: boolean;
    id: string;
    indeterminate?: boolean;
    label: string;
}

export interface RenderNodeProps {
    checked: boolean;
    children: RenderNodeProps[];
    id: string;
    indeterminate?: boolean;
    label: string;
    onCheckedChange: () => void;
}

export { CheckboxGroup, CheckboxTree };
