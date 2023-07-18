import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useListNamesStore = defineStore('names', {
    state: () => ({
        ListNames: ref<string[]>([])
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