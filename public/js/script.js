new Vue({
    el: "#main",
    data: {
        name: "Habanero",
        seen: false,
        animals: [],
        cards: [],
        title: "",
        description: "",
        username: "",
        file: null
    },
    mounted: function() {
        var me = this;
        axios
            .get("/animals")
            .then(function(response) {
                // console.log("response from /animals:", response.data);
                // console.log("me.animals: ", me.animals);
                me.animals = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
        axios
            .get("/cards")
            .then(function(response) {
                // console.log("slash route was called");
                // console.log("me.cards:", me.cards);
                me.cards = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
    },
    methods: {
        myFunction: function(animalClickedOn) {
            // console.log("my function is running");
            // console.log("name", name);
            this.name = animalClickedOn;
        },
        handleClick: function(e) {
            var me = this;
            e.preventDefault();
            // console.log("this: ", this);
            var fd = new FormData();
            fd.append("file", this.file);
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            axios
                .post("/upload", fd)
                .then(function(resp) {
                    me.cards.unshift(resp.data.image);
                    console.log("response from server", resp);
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        handleChange: function(e) {
            console.log("handle change is happening");
            console.log("e.target.files[0]: ", e.target.files[0]);
            this.file = e.target.files[0];
        }
    }
});
