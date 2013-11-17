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

        var _b = b !== undefined ? b : 0;
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


    var PainterCanvas = function (p, options) {


        /* ===== instance members ===== */

        /* ----- fields ----- */

        var _parent = p;
        var _readOnly = options.readOnly ? options.readOnly : false;
        var _e = jQuery("<table></table>");
        var _size = options.data ? options.data.length : options.size;
        var _minSize = 10;
        var _maxSize = 20;
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
            return _rows[y].getTile(x);
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
            var oldValue = _size;
            _size = s;
            repaint(oldValue - 1);
        };

        var resizeCanvas = function() {
            _e.css({
                height: _e.width()
            });
        };

        var animateRow = function(i, smaller) {
            if(i == _size - (smaller ? 1 : 0))
                return;
            if(smaller)
                doGetRow(i).el()
                    .hide(_effect, { duration: _delay, direction: "up", complete: function() { animateRow(i - 1, smaller); } });
            else
                doGetRow(i).el()
                    .show(_effect, { duration: _delay, direction: "down", complete: function() { animateRow(i + 1, smaller); } });
        };

        var animateColumn = function(i, smaller) {
            if(i == _size - (smaller ? 1 : 0))
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
            var smaller = _size < oldValue;
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
                .addClass("painter-canvas")
                .appendTo(_parent);

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
/*
            for(var x = 0; x < _size; x++) {
                _cols[x].getHeader()
                    .appendTo(colHeaderRow);
                if(!_readOnly) {
                    _cols[x].getHeader()
                        .bind("mouseup", function() {
                            _cols[x].setBudget(_currentBudget);
                        })
                        .bind("mouseenter", function(e) {
                            if(e.buttons == 1) {
                                _cols[x].setBudget(_currentBudget);
                            }
                        })
                        .bind("mousedown", function() {
                            _cols[x].setBudget(_currentBudget);
                        });
                }
            } */
            $.each(_cols, function(x) {
                _cols[x].getHeader()
                    .appendTo(colHeaderRow);
                if(!_readOnly) {
                    _cols[x].getHeader()
                        .bind("mouseup", function() {
                            _cols[x].setBudget(_currentBudget);
                        })
                        .bind("mouseenter", function(e) {
                            if(e.buttons == 1) {
                                _cols[x].setBudget(_currentBudget);
                            }
                        })
                        .bind("mousedown", function() {
                            _cols[x].setBudget(_currentBudget);

                        });
                }
            });

            $.each(_rows, function (y) {
                _rows[y].el().appendTo(_e);
                _rows[y].getHeader()
                    .appendTo(_rows[y].el());
                if(!_readOnly) {
                    _rows[y].getHeader()
                        .bind("mouseup", function() {
                            _rows[y].setBudget(_currentBudget);
                        })
                        .bind("mouseenter", function(e) {
                            if(e.buttons == 1) {
                                _rows[y].setBudget(_currentBudget);
                            }
                        })
                        .bind("mousedown", function() {
                            _rows[y].setBudget(_currentBudget);
                        });
                }
                $.each(_cols, function (x) {
                    _cols[x].el().appendTo(_colGroups[0]);

                    tile(x, y).el()
                        .appendTo(_rows[y].el());
                    if(!_readOnly) {
                        tile(x, y).el()
                            .bind("mouseenter", evtHandleClickDrag = function(e) {
                                if (e.buttons == 1) {
                                    tile(x, y).setBudget(_currentBudget);
                                    if(document.selection !== undefined)
                                        document.selection.removeAllRanges();
                                }
                            })
                            .bind("mouseup", function() {
                                if(document.selection !== undefined)
                                    document.selection.removeAllRanges();
                            })
                            .bind("mousedown", evtPaintBudget = function() {
                                tile(x, y).setBudget(_currentBudget);
                            });
                    }
                });
            });

            for(var x = _size; x < _maxSize; x++) {
                _cols[x].getHeader().hide();
                _cols[x].getTileElements().hide();
                _rows[x].el().hide();
            }
        })();


        /* ----- privileged methods ----- */


        this.getBudget = function (x, y) {
            doGetBudget();
        };

        this.setBudget = function (x, y, b) {
            doSetBudget(x, y, b);
        };

        this.setCurrentBudget = function(b) {
            _currentBudget = b;
        }

        this.el = function() { return _e; };

        this.getSize = function() { return _size; };

        this.setSize = function(s) {
            doResize(s);
        };

        this.getMinimumSize = function() { return _minSize; };

        this.getMaximumSize = function() { return _maxSize; };

        this.getPortion = function(b) {
            var bt = 0;
            for(var y = 0; y < _size; y++)
                for(var x = 0; x < _size; x++)
                    if(tile(x, y).getBudget() == b)
                        bt++;
            return bt / Math.pow(_size, 2);
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
        var _parent = jQuery("#" + e + "Meta");
        var _palette = p;
        var _pe = jQuery("<ul></ul>");
        var _canvas = new PainterCanvas(jQuery("#" + e + "Canvas"), options);
        var _currentBudget = 1;
        var _totalBudget = 2270000000000;

        var _size = 10;
        var _sze = jQuery("<select></select>");

        var doSetCurrentBudget = function(b) {
            _currentBudget = b;
            _canvas.setCurrentBudget(b);

            _pe.find("li").removeClass("selected");

            _pe.find(".b" + _currentBudget).addClass("selected");
        };

        var updatePalette = function() {


            for(var i in _palette) {
                _pe
                    .find(".b" + i)
                    .find(".budget-percent")
                    .text((_canvas.getPortion(i) * 100).toFixed(2));

                _pe
                    .find(".b" + i)
                    .find(".budget-money")
                    .text((_canvas.getPortion(i) * _totalBudget / 1000000000).toFixed(2) + "B");
            }
        };

        var evtUpdatePalette = function() {
            updatePalette();
        };

        _palette.unshift({ name: "Unallocated", color: "transparent" });

        for(var sz = _canvas.getMinimumSize(); sz <= _canvas.getMaximumSize(); sz++)
            _sze
                .append(jQuery("<option></option>")
                    .val(sz)
                    .text(sz + "x" + sz)
                    .attr("selected", function() { return sz == _size; }))
                .bind("change", function() { _canvas.setSize(jQuery(this).val()); })
        _parent
            .append(jQuery("<h3></h3>").text("Resolution"))
            .append(_sze)
            .append(jQuery("<h3></h3>").text("Palette"))
            .append(_pe);

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
                .attr("class", "b" + i)
                .bind("click", function() {
                    doSetCurrentBudget(i);
                })
                .appendTo(_pe);

            if(i == 1)
                pcol.addClass("selected");
        });

        for(var y = 0; y < _canvas.getMaximumSize(); y++) {
            _canvas.getRow(y).getHeader()
                .bind("mouseup", evtUpdatePalette)
                .bind("mouseenter", function(e) {
                    if (e.buttons == 1) {
                        evtUpdatePalette(e);
                    }
                })
                .bind("mousedown", evtUpdatePalette);
            for(var x = 0; x < _canvas.getMaximumSize(); x++) {
                _canvas.getColumn(x).getHeader()
                    .bind("mouseup", evtUpdatePalette)
                    .bind("mouseenter", function(e) {
                        if (e.buttons == 1) {
                            evtUpdatePalette(e);
                        }
                    })

                    .bind("mousedown", evtUpdatePalette);

                _canvas.getTile(x, y).el()
                    .bind("mouseup", evtUpdatePalette)
                    .bind("mouseenter", function(e) {
                        if (e.buttons == 1) {
                            evtUpdatePalette(e);
                        }
                    })
                    .bind("mousedown", evtUpdatePalette);
            }
        }

        this.el = function() { return _e; }
    };


    /* =============
     * Painter - End
     * =============
     */
//})();