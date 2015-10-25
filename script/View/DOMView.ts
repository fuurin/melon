﻿/// <reference path="../referenceFreeMakingMusic.ts"/>

// This class is super class of each DOM element View.
// Inheritance of this class means the child class is one of DOM element View(Concrete Observer).

class DOMView {
    protected $: JQuery;

    // DOMObjects have reference of their models. 
    // This is object. So it's recommended to get each model in child classes.
    constructor(protected game: Phaser.Game, constants: CONSTANTS.DOMView, protected models: Object) {
        // DOMObjects have their own Element of jQuery by using selector.
        this.$ = $(constants.selector);
    }
}