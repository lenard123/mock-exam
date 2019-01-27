<template>
<div>
    <loading v-if="state=='loading'"/>
    <error v-else-if="state=='error'" @retry="getSubject"/>
    <div v-else class="pages">
        <h1>Choose Category</h1>
        <div class="card mt-1" v-for="subject in subjects" @click="openSubject(subject.name)">
            <div class="card-body">
                <div class="card-title">{{ subject.name }}</div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {

    data: function () {
        return {
            state:"loading"
        }
    },

    created: function () {
        this.getSubject();
    },

    methods: {
        getSubject: function () {
            this.state = "loading"
            axios.get("data/subjects.json")
                .then(response=>{
                    this.subjects = response.data;
                    this.state = "success"
                })
                .catch(error=>{
                    console.log(error)
                    this.state = "error"
                })            
        },

        openSubject: function (subject) {
            this.$router.push({name:"set", params:{subject}})
        }
    },

    computed: {
        subjects: {
            get: function () {
                return this.$store.state.subjects;
            },
            set: function (subjects) {
                this.$store.commit("subjects", subjects)
            }
        }
    }
}
</script>