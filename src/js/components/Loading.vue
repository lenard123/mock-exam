<template>
    <div class="loading" :style="customStyle">
        {{ title }}
        <div class="progress">
            <div 
                :class="'progress-bar '+has_design+type" 
                role="progressbar" :aria-valuenow="value" aria-valuemin="0" 
                :aria-valuemax="total" :style="{'width': width+'%'}">
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    props: {
        title: {default:"Loading..."},
        value: {default:"75"},
        total: {default:"100"},
        type: {default:""},
        design: {default: true},
        customStyle: {default:""}
    },

    computed: {
        has_design: function () {
            if (this.design) {
                return " progress-bar-striped progress-bar-animated ";
            } else {
                return "";
            }
        },

        width: function () {
            return this.value/this.total*100;
        }
    }
}
</script>