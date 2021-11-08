import { Directive } from "vue";

type ElementWithClickOutside = HTMLElement & {
    clickOutsideHandler: (event: MouseEvent) => void;
}

export const clickOutsideDirective: Directive = {
    mounted(el: ElementWithClickOutside, binding, node) {
        el.clickOutsideHandler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if(!(el == target || el.contains(target))) {
                binding.value();
            }
        }
        document.addEventListener('click', el.clickOutsideHandler);
    },
    unmounted(el: ElementWithClickOutside) {
        document.removeEventListener('click', el.clickOutsideHandler);
    }
}