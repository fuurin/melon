/// <reference path="../reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(game, constants, models, data) {
        var _this = this;
        _super.call(this, game, constants, models);
        this.constants = constants;
        this.data = data;
        this.music = this.models["music"];
        this.stationery = this.models["stationery"];
        this.instrument = this.models["instrument"];
        this.pointer = this.game.device.touch ? this.game.input.pointer1 : this.game.input.activePointer;
        this.music.onChangeExtension(function () { _this.changeExtension(); });
        this.setPosition(data.start * constants.width, constants.pitch.indexOf(data.pitch) * constants.height);
    }
    Note.prototype.setPhysical = function () {
        this.game.physics.enable(this);
    };
    Note.prototype.setInput = function () {
        var _this = this;
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputUp.add(function () { _this.music.refresh(); });
        this.events.onInputDown.add(function () { _this.touchNote(); });
        this.events.onInputOver.add(function () {
            if (_this.stationery.getStationery === _this.constants.eraseStationery && _this.pointer.isDown)
                _this.erase();
        });
    };
    Object.defineProperty(Note.prototype, "getNoteData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Note.prototype.touchNote = function () {
        this.music.select(this.data);
        if (this.stationery.getStationery === this.constants.eraseStationery)
            this.erase();
    };
    Note.prototype.erase = function () {
        this.music.select(this.data);
        this.music.erase(this.data);
        this.destroy();
    };
    Note.prototype.changeExtension = function () {
        if (this.music.getSelectedNote === this.data)
            this.width = this.constants.width * (this.music.getSelectedNote.extension + 1);
    };
    Note.prototype.onOverlap = function () {
        this.sound = this.game.sound.play(this.instrument.getInstrument + this.data.pitch);
    };
    Note.prototype.offOverlap = function () {
        this.sound.fadeOut(100);
    };
    Note.prototype.update = function () {
        this.lengthenNote();
        this.shortenNote();
    };
    Note.prototype.lengthenNote = function () {
        var _this = this;
        var juttingOut = (this.pointer.x + this.game.camera.x) - (this.x + this.width);
        if (juttingOut > 0)
            _.times(Math.ceil(juttingOut / this.constants.width), function () { _this.music.lengthen(_this.data); });
    };
    Note.prototype.shortenNote = function () {
        var _this = this;
        var juttingIn = (this.x + this.width) - (this.pointer.x + this.game.camera.x);
        if (juttingIn > 0)
            _.times(Math.floor(juttingIn / this.constants.width), function () { _this.music.shorten(_this.data); });
    };
    return Note;
})(SpriteView);
//# sourceMappingURL=Note.js.map