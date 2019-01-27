export default {
    state: {
        subjects: [],
        sets: [],
        questions: [],
        correct: [],
        wrong: []
    },

    mutations: {
        subjects: function (state, subjects) {
            state.subjects = subjects;
        },
        sets: function (state, sets) {
            state.sets = sets
        },
        questions: function (state, questions) {
            state.questions = questions;
        },
        addCorrect: function (state, val) {
            state.correct.push(val);
        },
        addWrong: function (state, val) {
            state.wrong.push(val);
        },
        resetQuestion: function (state) {
            state.questions = [];
            state.correct = [];
            state.wrong = [];
        }
    }
}