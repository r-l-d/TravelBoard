// Vue.component("my-component", {
//     // template: "<h2>hiya!</h2>",
//     template: `#my-template`,
//     data: function() {
//         return {
//             subGreeting: "yo!"
//         };
//     },
//     props: ["greetee", "greeting", "id"],
//     //all arguments passed to component
//     methods: {
//         changeSubGreeting: function() {
//             this.subGreeting = "nice to see you";
//         },
//         sendMessageToParent: function() {
//             this.$emit("goodbye");
//         }
//     }
// });

Vue.component("image-modal", {
    template: `#modal-template`,
    data: function() {
        return {
            title: "",
            url: "",
            username: "",
            description: "",
            created_at: "",
            comments: [],
            comment: "",
            comment_username: ""
        };
    },
    props: ["id"],
    mounted: function() {
        console.log("this.id: ", this.id);
        var me = this;
        axios.get("/modal/" + this.id).then(function({ data }) {
            console.log("data:", data);
            me.title = data.title;
            me.url = data.url;
            me.username = data.username;
            me.created_at = data.created_at;
            me.comments = data.comments;
        });
        var self = this;
        addEventListener("hashchange", function() {
            //set the location.hash to the id from the hash
            //modal should close itself if there is no image returned to modalds
        });
    },
    methods: {
        sendMessageToParent: function() {
            this.$emit("close", {
                currentImage: null
            });
        },
        submitComment: function() {
            const { comment_username, comment, id } = this;
            var me = this;
            axios
                .post("/comment", {
                    comment_username,
                    id,
                    comment
                })
                .then(function(resp) {
                    me.comments.unshift(resp.data);
                    me.comment = "";
                    me.comment_username = "";
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    watch: {
        id: function() {
            //function to run when id changes and modeal is open.
            //past the same code that is from the mounted function
        }
    }
});
