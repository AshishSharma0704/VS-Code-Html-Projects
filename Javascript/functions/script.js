function outer() {
    var x = 50;

    function inner() {
        x++;
        var a = 10;

        console.log(x);
        console.log(a);

        function innerMost() {
            var x = 21;
            console.log(x);
        }

        innerMost();
    }

    inner();
}

outer();