// @ts-nocheck
import { writable } from "svelte/store";

export let loginState = writable(null);

export let imageData = writable([{
    alt: 'test3',
    title: '',
    url: '',
    width: '',
    class: ''
}]);