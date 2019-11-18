new Vue({
    el: "#main",
    data: {
        name: "Habanero",
        seen: false,
        animals: [],
        cards: []
    },
    mounted: function() {
        var me = this;
        axios
            .get("/animals")
            .then(function(response) {
                console.log("response from /animals:", response.data);
                console.log("me.animals: ", me.animals);
                me.animals = response.data;
            })
            .catch(err => {
                console.log(err);
            });
        axios
            .get("/cards")
            .then(function(response) {
                console.log("slash route was called");
                console.log("me.cards:", me.cards);
                me.cards = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
    methods: {
        myFunction: function(animalClickedOn) {
            console.log("my function is running");
            console.log("name", name);
            this.name = animalClickedOn;
        }
    }
});
