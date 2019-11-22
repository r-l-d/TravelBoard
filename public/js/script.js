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
        comment_username: "",
        showMore: true
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
        window.addEventListener("hashchange", function() {
            console.log("window.location.hash", window.location.hash.slice(1));
            console.log("currentImage before click:", me.currentImage);
            me.currentImage = window.location.hash.slice(1);
            console.log("currentimage after click", me.currentImage);
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
            location.hash = "";
            history.replaceState(null, null, " ");
        },
        getNext: function() {
            var me = this;
            const lastId = me.cards[me.cards.length - 1].id;
            axios
                .get("/next/" + lastId)
                .then(function(response) {
                    me.cards.push.apply(me.cards, response.data);
                })
                .catch(function(err) {
                    console.log(err);
                });
            axios
                .get("/last")
                .then(function(response) {
                    if (response.data[0].id == lastId) {
                        me.showMore = false;
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }
});
document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
});
