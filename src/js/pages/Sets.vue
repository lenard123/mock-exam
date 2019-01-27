<template>
<div>
    <loading v-if="state=='loading'"/>
    <error v-else-if="state=='error'" @retry="error"/>
    <div v-else class="pages">
        <h1>Choose Set of Questions</h1>
        <div class="card mt-1" v-for="set in sets" @click="$router.push(`${subject}/${set.name}`)">
            <div class="card-body">
                <div class="card-title">{{ set.name }}</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {

    data: function () {
        return {
            state: "loading",
            error: this.getSubject
        }
    },

    created: function () {
        if (this.subjects.length <= 0) {
            this.getSubject();
        } else {
            this.getData();
        }
    },

    methods: {

        getSubject: function () {
            this.state='loading'
            axios.get("data/subjects.json")
                .then(response=>{
                    this.state='success'
                    this.subjects = response.data;
                    this.getData()
                })
                .catch(error=>{
                    console.log(error)
                    this.state = 'error';
                })
        },

        getData: function () {
            var subject;
            for (var i in this.subjects) {
                if (this.subjects[i].name == this.subject)
                    subject = this.subjects[i];
            }
            if (subject == undefined) {
                alert("Subject not found");
                this.$router.push("/");
            } else {
                this.getSet(subject);
            }
        },

        getSet: function (subject) {
            this.state = 'loading'
            axios.get(subject.data)
                .then(response=>{
                    this.state='success'
                    this.sets = response.data;
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                    this.state='error'
                })
        }

    },

    computed: {
        
        subject: function () {
            return this.$route.params.subject;
        },

        subjects: {
            
            get: function () {
                return this.$store.state.subjects;
            },

            set: function (val) {
                this.$store.commit('subjects', val);
            }

        },

        sets: {

            get: function () {
                return this.$store.state.sets;
            },

            set: function (val) {
                this.$store.commit('sets', val);
            }

        }

    }
}
</script>