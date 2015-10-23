/// <reference path="../reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SaveButton = (function (_super) {
    __extends(SaveButton, _super);
    function SaveButton(game, constants, models) {
        _super.call(this, game, constants, models);
        this.constants = constants;
        this.music = this.models["music"];
        this.setView();
        this.setEvent();
    }
    SaveButton.prototype.setView = function () {
        this.$.append($("<img src=" + this.constants.image + " />").addClass("buttonImage")
            .css({ width: "70px", height: "50px" }));
    };
    SaveButton.prototype.setEvent = function () {
        var _this = this;
        this.$.on(this.game.device.touch ? "touchstart" : "mousedown", function () { _this.save(); });
    };
    SaveButton.prototype.save = function () {
        if (localStorage.getItem("music") && !confirm("The music you have already saved will be disposed. Is it OK?"))
            return;
        var str = JSON.stringify(this.music.getMusic);
        localStorage.setItem("music", str); // Local Strage Save
        alert("Your music was saved!");
    };
    return SaveButton;
})(DOMView);
//# sourceMappingURL=SaveButton.js.map