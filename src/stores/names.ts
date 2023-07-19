import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useListNamesStore = defineStore('names', {
    state: () => ({
        ListNames: ref<string[]>([]),
        namesQuantity: ref(2)
    }),
    actions: {
        addNameToList(name:string): void {
            this.ListNames.push(name)
        },
        RemoveByIndex(index:number) {
            this.ListNames.splice(index, 1);
        }
    }
})