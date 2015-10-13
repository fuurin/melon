﻿/// <reference path="../reference.ts"/>

class Notes extends GroupView {

    private music: Music = this.models["music"];
    private stationery: Stationery = this.models["stationery"];
    private noteOverlapManager: NoteOverlapManager = this.models["noteOverlapManager"];
    public selectedNote: Note = null;

    constructor(game: Phaser.Game, private constants: CONSTANTS.Notes, models: Object) {
        super(game, constants, models);

        this.music.onSelect(() => { this.select(); });
        this.music.onRefresh(() => { this.refreshSelect(); });
        this.music.onWrite(() => { this.addNote(); });
        this.music.onErase(() => { this.removeNote(); });
    }

    setPhysical() {
        this.game.physics.arcade.enable(this, true);
    }

    select() {
        this.selectedNote = <Note>_.find(this.children, (note: Note) => { return note.getNoteData === this.music.getSelectedNote });
    }

    refreshSelect() {
        this.selectedNote = null;
    }

    addNote() {
        this.selectedNote = <Note> this.add(new Note(this.game, new CONSTANTS.Note, this.models, this.music.getSelectedNote));
        this.noteOverlapManager.addNote(this.selectedNote);
    }

    removeNote() {
        this.noteOverlapManager.removeNote(this.selectedNote);
    }

    update() {
        if (this.selectedNote) this.selectedNote.update();
    }
}