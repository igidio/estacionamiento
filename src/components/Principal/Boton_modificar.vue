<template>

<router-link
class="btn btn-primary btn-block" 
:to="{
    name: 'ModificarEspacio', params: {id: id}
    }
"
>
    <i class="fas fa-edit"></i> {{texto}}
</router-link>

</template>

<script>
export default {
    props: {
        id: String,
        texto: String
    },
    components: {
    },
    methods: {
    }
}
</script>