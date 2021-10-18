<template>
<router-link :to="direccion">
    <div class="btn btn-block btn-primary mb-3"><i class="fa fa-plus-circle"></i> Agregar nuevo registro</div>
</router-link>
</template>

<script>
export default {
    props: {
        direccion: String
    }
}
</script>