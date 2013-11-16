/**
 * Created by REDFOX Wizpad on 11/14/13.
 */

//(function () {
    /* ============
     * Tile - Start
     * ============
     */


    /**
     *  * The class for the tiles used in the budget painter.
     * @param b the budget allocation of this tile
     * @constructor
     */
    var Tile = function (b) {


        /* ----- fields ----- */

        var _b = arguments.length > 2 ? b : 0;
        var _e = jQuery("<td></td>");


        /* ----- private methods ----- */

        /**
         * Repaints the tile
         */
        var repaint = function () {
            _e
                .html(Tile.getBudgetName(_b))
                .addClass("b" + _b);
        };

        var doSetBudget = function (b) {
            _e.removeClass("b" + _b);
            _b = b;
            repaint();
        };


        /* ----- constructor body ----- */

        (function () {
            _e
                .css({ verticalAlign: "top" });

            repaint();
        })();


        /* ----- privileged methods ----- */

        /**
         * Returns the allocated budget for this tile.
         * @returns {*}
         */
        this.getBudget = function () {
            return _b;
        };

        /**
         * Sets the allocation of this tile.
         * @param b the budget
         */
        this.setBudget = function (b) {
            doSetBudget(b);
        };

        /**
         * Gets the element associated with this tile.
         * @returns {jQuery|*}
         */
        this.getElement = function () {
            return _e;
        };
    };


    /* ===== static members ===== */


    Tile.budgetDesc = [
        { name: "No Budget", bgColor: "#FFF", borderColor: "#EEE" },
        { name: "Budget 1", bgColor: "#0F0", borderColor: "#0E0" },
        { name: "Budget 2", bgColor: "#FF0", borderColor: "#EE0" },
        { name: "Budget 3", bgColor: "#0FF", borderColor: "#0EE" }
    ];

    Tile.getBudgetName = function (i) {
        return Tile.budgetDesc[i].name
    };
    Tile.getBudgetBackColor = function (i) {
        return Tile.budgetDesc[i].bgColor
    };
    Tile.getBudgetBorderColor = function (i) {
        return Tile.budgetDesc[i].bgColor
    };


    /* ==========
     * Tile - End
     * ==========
     */


    /* ===========
     * Row - Start
     * ===========
     */


    var Row = function(t) {
        var _tiles = arguments.length == 1 ? t : [];
        var _e = jQuery("<tr></tr>");
        var _he = jQuery("<th></th>");


        _he
            .attr("class", "row-header")
            .html("&nbsp;");


        this.getTiles = function() {
            return _tiles;
        };

        this.getTile = function(i) {
            return _tiles[i];
        };

        this.initTile = function(t, i) {
            _tiles[i] = t;
        };

        this.getElement = function() {
            return _e;
        };

        this.getHeader = function() {
            return _he;
        };

        this.setBudget = function(b) {
            for(var i in _tiles)
                _tiles[i].setBudget(b);
        }
    };


    /* =========
     * Row - End
     * =========
     */


    /* ==============
     * Column - Start
     * ==============
     */


    var Column = function(t) {
        var _tiles = arguments.length == 1 ? t : [];
        var _e = jQuery("<col>");
        var _he = jQuery("<th></th>");


        _he
            .attr("class", "col-header")
            .html("&nbsp;");

        this.getTiles = function() {
            return _tiles;
        };

        this.getTile = function(i) {
            return _tiles[i];
        };

        this.initTile = function(t, i) {
            _tiles[i] = t;
        };

        this.getElement = function() {
            return _e;
        };

        this.getHeader = function() {
            return _he;
        };

        this.setBudget = function(b) {
            for(var i in _tiles)
                _tiles[i].setBudget(b);
        }
    };


    /* ============
     * Column - End
     * ============
     */


    /* ===============
     * Painter - Start
     * ===============
     */


    var Painter = function (e, options) {


        /* ===== instance members ===== */

        /* ----- fields ----- */

        var _e = jQuery(e);
        var _canvas;
        var _tileCount = options.data ? options.data.length : options.tileCount;
        var _maxSize = 20;
        var _headerColor = "#ccc";
        var _width = options.width ? options.width : "75%";
        var _colGroups = [jQuery("<colgroup></colgroup>")];
        var _rows = [];
        var _cols = [];
        var _currentBudget = 1;


        /* ----- private methods ----- */

        var instantiateTiles = function () {
            for(var y = 0; y < _maxSize; y++) {
                _rows[y] = new Row();
                for(var x = 0; x < _maxSize; x++) {
                    var budgetDatum = 0;
                    try {
                        budgetDatum = options.data[y][x];
                    } catch(e) {}

                    _cols[x] = _cols[x] !== undefined ? _cols[x] : new Column();

                    var tile = new Tile(budgetDatum);

                    _cols[x].initTile(tile, y);
                    _rows[y].initTile(tile, x);
                }
            }
        };

        var tile = function(x, y) {
            //if(_cols[x].getTile(y) == _rows[y].getTile(x))
                return _rows[y].getTile(x);
            //return null;
        };

        var doGetBudget = function(x, y) {
            tile(x, y).getBudget();
        };

        var doSetBudget = function (x, y, b) {
            tile(x, y).setBudget(b);
        };

        var getRow = function(r) {
            return _rows[r];
        };

        var getColumn = function(c) {
            return _cols[c];
        };

        var doResize = function(s) {
            for(var i = s; i < _maxSize; i++) {
                getRow(i).toggleClass("hidden-xs");
                getColumn(i).toggleClass("hidden-xs");
            }
        };


        /* ----- event handlers ----- */

        var evtPaintBudget = function () {};

        var evtHandleClickDrag = function (e) {};




        /* ----- constructor body ----- */

        (function() {
            _canvas = jQuery("<table></table>")
                .attr("class", "painter")
                .css({
                    margin: "0 auto",
                    width: _width
                })
                .appendTo(_e);

            // be responsive when resizing
            $(window).on("resize", function () {
                _canvas.find("td").css({
                    height: _canvas.width() / _maxSize + "px"
                });
            });

            // instantiate tiles
            instantiateTiles();

            _colGroups[0].appendTo(_canvas);

            var colHeaderRow = jQuery("<tr></tr>");

            colHeaderRow.appendTo(_canvas);

            jQuery("<th></th>")
                .appendTo(colHeaderRow)
                .html("&nbsp;");

            $.each(_cols, function(x) {
                _cols[x].getHeader()
                    .appendTo(colHeaderRow)
                    .bind("click", function() {
                        _cols[x].setBudget(_currentBudget);
                    });
            });

            $.each(_rows, function (y) {
                _rows[y].getElement().appendTo(_canvas);
                _rows[y].getHeader().
                    appendTo(_rows[y].getElement()).
                    bind("click", function() {
                        _rows[y].setBudget(_currentBudget);
                    });
                $.each(_cols, function (x) {
                    _cols[x].getElement().appendTo(_colGroups[0]);

                    tile(x, y)
                        .getElement()
                        .appendTo(_rows[y].getElement())
                        .css({
                            width: 100 / _maxSize + "%",
                            height: _canvas.width() / _maxSize + "px"
                        })
                        .bind("click", evtPaintBudget = function() {
                            tile(x, y).setBudget(_currentBudget);
                        })
                        .bind("mousemove", evtHandleClickDrag = function(e) {
                            if (e.buttons == 1) {
                                tile(x, y).setBudget(_currentBudget);
                                document.selection.removeAllRanges();
                            }
                        })
                        .bind("mouseup", function() { document.selection.removeAllRanges() });
                })
            });
        })();


        /* ----- privileged methods ----- */


        this.getBudget = function (x, y) {
            doGetBudget();
        };

        this.setBudget = function (x, y, b) {
            doSetBudget(x, y, b);
        };

        this.setSize = function(s) {
            doResize(s);
        };
    };


    /* =============
     * Painter - End
     * =============
     */


    /* ===================
     * Custom Code - Start
     * ===================
     */


    /* =================
     * Custom Code - End
     * =================
     */
//})();