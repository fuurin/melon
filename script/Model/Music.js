/// <reference path="../reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Music = (function (_super) {
    __extends(Music, _super);
    function Music(game, constants) {
        _super.call(this, game, constants);
        this.constants = constants;
        this.selectedNote = null;
        this.music = _.object(this.constants.pitch, _.times(this.constants.pitchNum, function () { return []; }));
    }
    Music.prototype.checkExist = function (pitch, unitNote, point) {
        return this.music[pitch].some(function (note) { return note.start <= point && point <= note.start + note.extension; });
    };
    Object.defineProperty(Music.prototype, "getSelectedNote", {
        get: function () {
            return this.selectedNote;
        },
        enumerable: true,
        configurable: true
    });
    Music.prototype.select = function (note) {
        this.selectedNote = note;
        this.$.triggerHandler(this.constants.events["select"]);
    };
    Music.prototype.refresh = function () {
        this.selectedNote = null;
        this.$.triggerHandler(this.constants.events["refresh"]);
    };
    Music.prototype.write = function (note) {
        this.select(this.music[note.pitch][this.music[note.pitch].push(note) - 1]);
        this.$.triggerHandler(this.constants.events["write"]);
    };
    Music.prototype.erase = function (note) {
        this.music[note.pitch].splice(this.music[note.pitch].indexOf(note), 1);
        this.refresh();
        this.$.triggerHandler(this.constants.events["erase"]);
    };
    Music.prototype.lengthen = function (note) {
        if (this.checkExist(note.pitch, note.unitNote, note.start + note.extension + 1))
            return;
        note.extension++;
        this.$.triggerHandler(this.constants.events["extension"]);
    };
    Music.prototype.shorten = function (note) {
        note.extension--;
        if (note.extension < 0)
            note.extension = 0;
        this.$.triggerHandler(this.constants.events["extension"]);
    };
    Music.prototype.onSelect = function (handler) { return this.$.bind(this.constants.events["select"], handler); };
    Music.prototype.onRefresh = function (handler) { return this.$.bind(this.constants.events["refresh"], handler); };
    Music.prototype.onWrite = function (handler) { return this.$.bind(this.constants.events["write"], handler); };
    Music.prototype.onErase = function (handler) { return this.$.bind(this.constants.events["erase"], handler); };
    Music.prototype.onChangeExtension = function (handler) { return this.$.bind(this.constants.events["extension"], handler); };
    return Music;
})(Model);
//# sourceMappingURL=Music.js.map