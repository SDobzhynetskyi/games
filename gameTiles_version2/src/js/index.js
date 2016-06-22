$(document).ready(function () {

    var GRID_ID = "grid_id";
    var DIMENSION_ID = "dimension_id";
    var chosenTiles = [];
    var clickCount = 0;
    var scoreCount = 0;

    function generateColors(dimension) {
        var colors = [];
        var colorsAmount = Math.pow(dimension, 2) / 2;

        for (var c = 0; c < colorsAmount; c++) {
            var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
            colors.push(color);
        };
        return colors.concat(colors);
    };


    function composeTiles(dimension, callback) {

        var colors = generateColors(dimension);
        var grid = document.createElement('table');
        grid.id = GRID_ID;

        for (var row = 0; row < dimension; ++row) {
            var tr = grid.appendChild(document.createElement('tr'));

            for (var col = 0; col < dimension; ++col) {
                var index = Math.floor(Math.random() * colors.length);

                var cell = tr.appendChild(document.createElement('td'));

                cell.style.width = "100px";
                cell.style.height = "100px";
                cell.style.backgroundColor = colors[index];
                cell.addEventListener('click', (function (el) {

                    return function () {
                        callback(el);
                      };
                    })(cell), false);

                colors.splice(index, 1);
            };
        };
        $("#area").append(grid);
    };


    function clearGameArea() {
        $("#" + GRID_ID).remove();
    }


    function buildGameArea() {
        var DEFAULT_VALUE = 4;
        var dimensionValue = $("#" + DIMENSION_ID).val() || DEFAULT_VALUE; //always numeric
        composeTiles(dimensionValue, function (el) {
            $(el).addClass("opened");
            chosenTiles.push(el.style.backgroundColor);
            clickCount += 1;
            $(".click").html(clickCount);
            $(el).removeClass("game");
            checkColors(chosenTiles);
            $(el).attr("disabled", true);
            console.log(clickCount,scoreCount);
          });
    };


    function checkColors(chosenTiles) {
        if ( chosenTiles.length > 1 ) {
            if (chosenTiles[0] == chosenTiles[1] ) {
                $(".opened").css("visibility", "hidden").removeClass("opened");
                scoreCount += 1;
                $(".score").html(scoreCount)
              chosenTiles.splice(0, 2);
            } else  {
                $(".opened").removeClass("opened").addClass("game");
                chosenTiles.splice(0, 2);
            };
        };
    };


    function startGame(dimension) {
        $("td").addClass("game");
    };
    function  defResult() {
      $(".score").html("0");
      $(".click").html("0");
    }

    function addPlayButtonListener() {
        $("#playButton").on("click", function () {
            setTimeout(startGame, 4000)
            clearGameArea();
            buildGameArea();
            defResult();
        });
    };

    (function () {
        addPlayButtonListener();
    })();
});
