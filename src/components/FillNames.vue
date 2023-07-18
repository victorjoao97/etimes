<script setup lang="ts">
import { ref } from 'vue';
import { useListNamesStore } from '../stores/names';

const ListNamesStore = useListNamesStore();
const nameToAdd = ref('');
const filledNames = ref(ListNamesStore.ListNames)

const addName = () => {
  ListNamesStore.addNameToList(nameToAdd.value);
  nameToAdd.value = '';
};

const removeFilledName = (index: number) => {
  ListNamesStore.RemoveByIndex(index)
};
</script>

<template>
    <div>
        <div class="fields">
            <input v-model="nameToAdd" type="text" placeholder="Novo nome para lista">
            <button @click="addName">Adicionar nome</button>
        </div>
        <div class="filled-names">
            <div class="name" v-for="(filledName, index) in filledNames" v-bind:key="index">
                <span>{{ filledName }}</span>
                <button @click="removeFilledName(index)">Remover</button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.fields {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    input {
        font-size: 1.5rem;
    }
}
.filled-names {
    .name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
}
</style>