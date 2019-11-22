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
        var me = this;
        axios
            .get("/modal/" + this.id)
            .then(function({ data }) {
                if (data.length == 0) {
                    me.sendMessageToParent();
                } else {
                    console.log("data is found");
                    me.title = data.title;
                    me.url = data.url;
                    me.username = data.username;
                    me.created_at = data.created_at;
                    me.comments = data.comments;
                }
            })
            .catch(function(err) {
                console.log(err);
                console.log("no image found");
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
            var me = this;
            axios
                .get("/modal/" + this.id)
                .then(function({ data }) {
                    if (data.length == 0) {
                        me.sendMessageToParent();
                    } else {
                        console.log("data", data);
                        console.log("hash change, new image found");
                        me.title = data.title;
                        me.url = data.url;
                        me.username = data.username;
                        me.created_at = data.created_at;
                        me.comments = data.comments;
                    }
                })
                .catch(function(err) {
                    console.log("hash changed, no image found");
                });
        }
    }
});
