new Vue({
    el: "#main",
    data: {
        cards: [],
        title: "",
        description: "",
        username: "",
        file: null,
        currentImage: null
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
        // axios.get("/image"); //request for modal to get images
        //put a .getroute in the THEN of this to get the comments. Put both image and comments into object and send to modal
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
