<template>
<div>
    <loading v-if="state=='loading'"/>
    <error v-else-if="state=='error'" @retry="getQuestions()"/>
    <div class="pages" v-else>
        <h1>{{ subject }} <b>></b> {{ set }}</h1>
        <div class="card mt-1">
            <div class="card-header">
                <span class="float-left">Question #{{ number }}</span>
                <span class="float-right">{{ number }}/{{ total }}</span>
            </div>
            <div class="card-body">
                <h3 v-html="questions[number-1].question"></h3>
                <form>
                    <label v-for="(question, i) in questions[number-1].choices" class="form-inline" @click="answer=i">
                        <input type="radio" name="choices" :value="i"/>
                        <span v-html="' &nbsp;'+question"></span>
                    </label>

                    <input type="reset" id="choices_form" class="d-none">
                </form>
            </div>
            <div class="card-footer">
                <button class="btn btn-success" @click="next()" v-if="number<total">Next</button>
                <button class="btn btn-info" v-else @click="next()">View Result</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

    data: ()=>({
        state: "loading",
        number: 1,
        wrong: [],
        correct: [],
        answer: null
    }),

    created: function () {

        console.log(this)

        this.$store.commit('resetQuestion');

        if (this.sets.length <= 0) {
            this.$router.push("/"+this.subject);
        } else {
            this.getQuestions();
        }

    },

    methods: {

        getQuestions: function () {
            this.state = "loading"
            var data;
            for (var i in this.sets) {
                if (this.sets[i].name==this.set)
                    data = this.sets[i];
            }
            if (data == undefined) {
                alert("Set not found");
                this.$router.push(this.subject);
            } else {
                axios.get(data.data)
                    .then(response=>{
                        this.state='success';
                        this.questions = response.data;
                        this.$nextTick(this.parse)
                        console.log(response);
                    })
                    .catch(error=>{
                        this.state='error';
                        console.log(error);
                    })
            }
        },

        next: function () {
            if (this.answer == null)
                return;
            if (this.answer == this.questions[this.number-1].answer) {
                this.$store.commit('addCorrect', this.number-1)
            } else {
                this.$store.commit('addWrong', this.number-1)
            }

            this.answer = null;
            $('#choices_form').click()

            if (this.number < this.total) {
                this.number++;
                this.$nextTick(this.parse)
            } else {
                this.$router.push("/"+this.subject+"/"+this.set+"/result")
            }


        },

        parse: function () {
            var sqr = $('sqr');
            var val = sqr.html();
            sqr.html("&#8730;<span style='text-decoration:overline'>"+val+"</span>")
        }

    },

    computed: {
        
        subject: function () {
            return this.$route.params.subject;
        },

        set: function () {
            return this.$route.params.set;
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