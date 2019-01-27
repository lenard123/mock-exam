<template>
<div class="error card text-white bg-danger mb-3" style="max-width: 20rem;">
    <div class="card-body">
        <h4 class="card-title">{{ title }}</h4>
        <p class="card-text">{{ description }}</p>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline-secondary text-white" @click="$emit('retry')">Refresh</button>
    </div>    
</div>
</template>

<script>
export default {
    props: {
        title: {
            default: "An error occured"
        },

        description: {
            default: "Try to refresh"
        }
    }
}
</script>