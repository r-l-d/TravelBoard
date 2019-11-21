new Vue({
    el: "#main",
    data: {
        cards: [],
        title: "",
        description: "",
        username: "",
        file: null,
        currentImage: location.hash.slice(1),
        comment: "",
        comment_username: ""
    },
    mounted: function() {
        var me = this;
        axios
            .get("/cards")
            .then(function(response) {
                me.cards = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    methods: {
        handleClick: function(e) {
            var me = this;
            e.preventDefault();
            var fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            axios
                .post("/upload", fd)
                .then(function(resp) {
                    me.cards.unshift(resp.data.image);
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        handleChange: function(e) {
            this.file = e.target.files[0];
        },
        setCurrentImage: function(id) {
            this.currentImage = id;
        },
        unsetCurrentImage: function() {
            this.currentImage = null;
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
});
