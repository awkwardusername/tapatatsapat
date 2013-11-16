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
        this.el = function () {
            return _e;
        };
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

        this.el = function() {
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

        this.el = function() {
            return _e;
        };

        this.getTileElements = function() {
            var e = [];
            for(var i in _tiles)
                e.push(_tiles[i].el()[0]);
            return jQuery(e);
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


    /* =====================
     * PainterCanvas - Start
     * =====================
     */


    var PainterCanvas = function (options) {


        /* ===== instance members ===== */

        /* ----- fields ----- */

        var _e = jQuery("<table></table>");
        var _tileCount = options.data ? options.data.length : options.tileCount;
        var _minSize = 1;
        var _maxSize = 20;
        var _headerColor = "#ccc";
        var _width = options.width ? options.width : "75%";
        var _colGroups = [jQuery("<colgroup></colgroup>")];
        var _rows = [];
        var _cols = [];
        var _currentBudget = 1;
        var _effect = "blind";
        var _delay = 50;


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

        var doGetRow = function(r) {
            return _rows[r];
        };

        var doGetColumn = function(c) {
            return _cols[c];
        };

        var doResize = function(s) {
            var oldValue = _tileCount;
            _tileCount = s;
            repaint(oldValue - 1);
        };

        var resizeCanvas = function() {
            _e.css({
                height: _e.width()
            });
        };

        var animateRow = function(i, smaller) {
            if(i == _tileCount - (smaller ? 1 : 0))
                return;
            if(smaller)
                doGetRow(i).el()
                    .hide(_effect, { duration: _delay, direction: "up", complete: function() { animateRow(i - 1, smaller); } });
            else
                doGetRow(i).el()
                    .show(_effect, { duration: _delay, direction: "down", complete: function() { animateRow(i + 1, smaller); } });
        };

        var animateColumn = function(i, smaller) {
            if(i == _tileCount - (smaller ? 1 : 0))
                return;

            if(smaller) {
                doGetColumn(i).getHeader()
                    .hide(
                    _effect,
                    {
                        duration: _delay,
                        direction: "left",
                        complete: function() { animateColumn(i - 1, smaller); }
                    }
                );
                doGetColumn(i).getTileElements()
                    .hide(
                    _effect,
                    {
                        duration: _delay,
                        direction: "left"
                    }
                );
            }
            else {
                doGetColumn(i).getHeader()
                    .show(
                    _effect,
                    {
                        duration: _delay,
                        direction: "right",
                        complete: function() { animateColumn(i + 1, smaller); }
                    }
                );
                doGetColumn(i).getTileElements()
                    .show(
                    _effect,
                    {
                        duration: _delay,
                        direction: "right"
                    }
                );
            }
        };

        var repaint = function(oldValue) {
            var smaller = _tileCount < oldValue;
            animateRow(oldValue, smaller);
            animateColumn(oldValue, smaller);
            resizeCanvas();
        };


        /* ----- event handlers ----- */

        var evtPaintBudget = function () {};

        var evtHandleClickDrag = function (e) {};




        /* ----- constructor body ----- */

        (function() {
            _e
                .css({
                    margin: "0 auto",
                    width: _width
                })
                .css({ height: $(this).width() })
                .appendTo(_e);

            // be responsive when resizing
            $(window).on("resize", function () {
                _e.find("td").css({
                    height: _e.width() / _maxSize + "px"
                });
            });

            // instantiate tiles
            instantiateTiles();

            _colGroups[0].appendTo(_e);

            var colHeaderRow = jQuery("<tr></tr>");

            colHeaderRow.appendTo(_e);

            jQuery("<th></th>")
                .appendTo(colHeaderRow)
                .addClass("row-header")
                .addClass("col-header")
                .html("&nbsp;");

            $.each(_cols, function(x) {
                _cols[x].getHeader()
                    .appendTo(colHeaderRow)
                    .bind("click", function() {
                        _cols[x].setBudget(_currentBudget);
                    });
            });

            $.each(_rows, function (y) {
                _rows[y].el().appendTo(_e);
                _rows[y].getHeader().
                    appendTo(_rows[y].el()).
                    bind("click", function() {
                        _rows[y].setBudget(_currentBudget);
                    });
                $.each(_cols, function (x) {
                    _cols[x].el().appendTo(_colGroups[0]);

                    tile(x, y)
                        .el()
                        .appendTo(_rows[y].el())
                        /*
                        .css({
                            width: 100 / _tileCount + "%",
                            height: _canvas.width() / _tileCount + "px"
                        })
                        */
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
                });
            });
        })();


        /* ----- privileged methods ----- */


        this.getBudget = function (x, y) {
            doGetBudget();
        };

        this.setBudget = function (x, y, b) {
            doSetBudget(x, y, b);
        };

        this.getCurrentBudget = function() {
            return _currentBudget;
        }

        this.setCurrentBudget = function(b) {
            _currentBudget = b;
        }

        this.el = function() { return _e; };

        this.getSize = function() { return _tileCount; };

        this.setSize = function(s) {
            doResize(s);
        };

        this.getMinimumSize = function() { return _minSize; };

        this.getMaximumSize = function() { return _maxSize; };

        this.getPortion = function(b) {
            var bt = 0;
            for(var y = 0; y < _tileCount; y++)
                for(var x = 0; x < _tileCount; x++)
                    if(tile(x, y).getBudget() == b)
                        bt++;
            return bt / Math.pow(_tileCount, 2);
        };

        this.getRow = function(r) {
            return doGetRow(r);
        };

        this.getColumn = function(c) {
            return doGetColumn(c);
        };

        this.getTile = function(x, y) {
            return doGetRow(y).getTile(x);
        };
    };


    /* ===================
     * PainterCanvas - End
     * ===================
     */


    /* ===============
     * Painter - Start
     * ===============
     */


    var Painter = function(e, p, options) {
        var _canvasCont = jQuery("<div></div>");
        var _sidebarCont = jQuery("<div></div>");

        var _e = jQuery(e);
        var _palette = p;
        var _pe = jQuery("<ul></ul>");
        var _canvas = new PainterCanvas(options);;
        var _currentBudget = 1;
        var _totalBudget = 2270000000000;

        var _size = 10;
        var _sze = jQuery("<select></select>");

        var doSetCurrentBudget = function(b) {
            _currentBudget = b;
            _canvas.setCurrentBudget(b);

            _pe.find("li").removeClass("selected");

            _pe.find("#palette-" + _currentBudget).addClass("selected");
        };

        var updatePalette = function() {


            for(var i in _palette) {
                _pe
                    .find("#palette-" + i)
                    .find(".budget-percent")
                    .text((_canvas.getPortion(i) * 100).toFixed(2));

                _pe
                    .find("#palette-" + i)
                    .find(".budget-money")
                    .text((_canvas.getPortion(i) * _totalBudget / 1000000000).toFixed(2) + "B");
            }
        };

        var evtUpdatePalette = function() {
            updatePalette();
        };

        _e.attr("class", "painter");

        _canvasCont
            .attr("class", "col-xs-8")
            .appendTo(_e);

        _canvas.el().appendTo(_canvasCont);

        _sidebarCont
            .attr("class", "col-xs-4")
            .appendTo(_e);

        _palette.unshift({ name: "Unallocated", color: "transparent" });

        _pe
            .appendTo(_sidebarCont);

        for(var sz = _canvas.getMinimumSize(); sz <= _canvas.getMaximumSize(); sz++)
            _sze
                .append(jQuery("<option></option>")
                    .val(sz)
                    .text(sz + "x" + sz)
                    .attr("selected", function() { return sz == _canvas.getSize(); }))
                .bind("change", function() { _canvas.setSize(jQuery(this).val()); });
        _sze.appendTo(_sidebarCont);

        $.each(_palette, function(i) {
            var pcol = jQuery("<li></li>");
            var pname = jQuery("<strong></strong>")
                .attr("class", "budget-name")
                .text(_palette[i].name)
                .appendTo(pcol);
            var pmoney = jQuery("<strong></strong>")
                .attr("class", "budget-money")
                .text((_canvas.getPortion(i) * _totalBudget / 1000000000).toFixed(2) + "B")
                .appendTo(pcol);
            var ppcent = jQuery("<strong></strong>")
                .attr("class", "budget-percent")
                .text((_canvas.getPortion(i) * 100).toFixed(2))
                .appendTo(pcol);

            pcol
                .attr("id", "palette-" + i)
                .bind("click", function() {
                    doSetCurrentBudget(i);
                })
                .appendTo(_pe);

            if(i == 1)
                pcol.addClass("selected");
        });

        for(var y = 0; y < _canvas.getMaximumSize(); y++) {
            _canvas.getRow(y).getHeader().bind("click", evtUpdatePalette);
            for(var x = 0; x < _canvas.getMaximumSize(); x++) {
                _canvas.getColumn(x).getHeader().bind("click", evtUpdatePalette);

                _canvas.getTile(x, y).el()
                    .bind("click", evtUpdatePalette)
                    .bind("mouseup", evtUpdatePalette)
            }
        }

        this.el = function() { return _e; }
    };


    /* =============
     * Painter - End
     * =============
     */
//})();