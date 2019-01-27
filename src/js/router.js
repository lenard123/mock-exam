import Home from "./pages/Home.vue";
import Sets from "./pages/Sets.vue";
import Questions from "./pages/Questions.vue";
import Results from "./pages/Results.vue";

const routes = [
    {
        path: "/",
        component: Home,
        name: "Home",
    },

    {
        path: "/:subject",
        component: Sets,
        name: "set"
    },

    {
        path: "/:subject/:set",
        component: Questions,
        name: "Questions"
    },

    {
        path: "/:subject/:set/result",
        component: Results,
        beforeEnter: (to, from, next) => {
            if (from.name != "Questions")
                next({
                    name: "Questions", 
                    params: {
                        subject: to.params.subject,
                        set: to.params.set
                    }
                });
            else next();
        }
    }
]

const router = new VueRouter({
    routes,
    linkActiveClass: "active"
})

export default router