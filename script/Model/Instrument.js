/// <reference path="../reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Instrument = (function (_super) {
    __extends(Instrument, _super);
    function Instrument(game, constants) {
        _super.call(this, game, constants);
        this.constants = constants;
        this.changeInstrument(this.constants.instruments[this.constants.initInstrument]);
    }
    Object.defineProperty(Instrument.prototype, "getInstrument", {
        get: function () {
            return this.instrument;
        },
        enumerable: true,
        configurable: true
    });
    Instrument.prototype.changeInstrument = function (instrument) {
        this.instrument = instrument;
        this.$.triggerHandler(this.constants.events["changeInstrument"]);
    };
    Instrument.prototype.onChangeInstrument = function (handler) { return this.$.bind(this.constants.events["changeInstrument"], handler); };
    return Instrument;
})(Model);
//# sourceMappingURL=Instrument.js.map