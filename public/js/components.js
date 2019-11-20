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
            created_at: ""
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
        });
    },
    methods: {
        // setCurrentImage: function(image) {
        //     console.log("image", image);
        // }
        sendMessageToParent: function() {
            console.log("x has been clicked");
            this.$emit("close");
        }
    }
});
