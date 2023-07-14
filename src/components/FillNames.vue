<script setup lang="ts">
</script>
<template>
    <div>
        <div class="fields">
            <input type="text" placeholder="Novo nome para lista">
            <button>Adicionar nome</button>
        </div>
        <div class="filled-names">
            <div class="name">
                <span>Nome 1</span>
                <button>Remover</button>
            </div>
            <div class="name">
                <span>Nome 2</span>
                <button>Remover</button>
            </div>
            <div class="name">
                <span>Nome 3</span>
                <button>Remover</button>
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