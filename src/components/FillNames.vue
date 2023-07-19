<script setup lang="ts">
import { ref, watch } from 'vue';
import { useListNamesStore } from '../stores/names';
import { Plural } from '../utils'

interface InfoMessage {
    message: string;
    type: TypeInfoMessage;
}
enum TypeInfoMessage {
    WARNING, ERROR, SUCCESS
}

const ListNamesStore = useListNamesStore();
const nameToAdd = ref('');
const filledNames = ref(ListNamesStore.ListNames)
const namesQuantity = ref(ListNamesStore.namesQuantity)
const infoMessage = ref<InfoMessage | null>(null)


const addName = () => {
    if (!nameToAdd.value) return
    ListNamesStore.addNameToList(nameToAdd.value);
    nameToAdd.value = '';
    validateNames();
};

const removeFilledName = (index: number) => {
    ListNamesStore.RemoveByIndex(index)
    validateNames();
};

function validateNames() {
    const filledNamesQuantity = filledNames.value.length
    infoMessage.value = null;
    if (namesQuantity.value > filledNamesQuantity) {
        infoMessage.value = {
            message: `A quantidade de nomes é menor que a quantidade de times`,
            type: TypeInfoMessage.ERROR
        };
        return
    }
    const restOfNames = filledNamesQuantity % namesQuantity.value;
    if (restOfNames !== 0) {
        const plural = new Plural(restOfNames);
        infoMessage.value = {
            message: `${restOfNames} nome${plural.toChar('s')} est${plural.toChar('ão', 'á')} sobrando assim os times estarão desbalançeados`,
            type: TypeInfoMessage.WARNING
        };
    }
}

watch(namesQuantity, () => {
    if (namesQuantity.value <= 1) {
        namesQuantity.value = 2
    }
    validateNames()
})
</script>

<template>
    <div>
        <div class="fields quantity">
            <label for="namesQuantity">Quantidade de times</label>
            <input type="number" v-model="namesQuantity" id="namesQuantity">
        </div>
        <div class="fields">
            <input v-model="nameToAdd" type="text" placeholder="Novo nome para lista" @keypress.enter="addName">
            <button @click="addName">Adicionar nome</button>
        </div>
        <div class="info-message" :class="TypeInfoMessage[infoMessage?.type]" v-if="infoMessage">
            {{ infoMessage?.message }}
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
    margin-bottom: 0.5rem;

    input {
        font-size: 1.5rem;
    }

    &.quantity {
        input[type=number] {
            width: 100px;
        }
    }
}

.filled-names {
    .name {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
}

.info-message {
    margin-bottom: .5rem;

    &.WARNING {
        color: yellow;
    }

    &.ERROR {
        color: red;
    }
}
</style>