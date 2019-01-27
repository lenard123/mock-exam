<template>
<div>
    <loading v-if="state=='checking'" title="Checking, please wait"/>
    <div v-else class="pages">
        <div class="card mt-1">
            <div class="card-header">RESULTS</div>
            <div class="card-body">
                <h3>{{ message }}</h3>
                <loading title="Correct" :value="correct.length" :total="total" :design="false" type="bg-success" custom-style="padding:0%"/>
                <loading title="Wrong" :value="wrong.length" :total="total" :design="false" type="bg-danger" custom-style="padding:0%"/>
            </div>
            <div class="card-footer">
                <button class="btn btn-success">View Correct</button>
                <button class="btn btn-danger">View Wrong</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

    data: ()=>({
        state: "checking",
        passing_score: .50 //50%
    }),

    created: function () {
        setTimeout(()=> {
            this.state = 'done';
        }, 1000)
    },

    computed: {
      
        wrong: function () {
            return this.$store.state.wrong;
        },

        correct: function () {
            return this.$store.state.correct;
        },

        message: function () {
            if (this.ispassed) {
                return "Congratulations you passed the exam";
            } else {
                return "Nice try";
            }
        },

        ispassed: function () {
            var passing_score = this.total*this.passing_score;
            return this.correct.length >= passing_score;
        },

        subject: function () {
            return this.$route.params.subject;
        },

        set: function () {
            return this.$route.params.set;
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

        },

        questions: {

            get: function () {
                return this.$store.state.questions;
            },

            set: function (val) {
                this.$store.commit('questions', val);
            }

        },

        total: function () {
            return this.questions.length;
        }
    }

}
</script>