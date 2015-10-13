﻿/// <reference path="../reference.ts"/>

interface NoteData {
    pitch: string;
    unitNote: number;
    start: number;
    extension: number;
}

class Music extends Model {
    private music: { [pitch: string]: NoteData[] };
    private selectedNote: NoteData = null;

    constructor(game: Phaser.Game, private constants: CONSTANTS.Music) {
        super(game, constants);
        this.music = <any>_.object(this.constants.pitch, _.times(this.constants.pitchNum, () => { return [] }));
    }

    checkExist(pitch: string, unitNote: number, point: number): boolean {
        return this.music[pitch].some((note: NoteData) => { return note.start <= point && point <= note.start + note.extension; });
    }

    get getSelectedNote(): NoteData {
        return this.selectedNote;
    }

    select(note: NoteData) {
        this.selectedNote = note;
        this.$.triggerHandler(this.constants.events["select"]);
    }

    refresh() {
        this.selectedNote = null;
        this.$.triggerHandler(this.constants.events["refresh"]);
    }

    write(note: NoteData) {
        this.select(this.music[note.pitch][this.music[note.pitch].push(note) - 1]);
        this.$.triggerHandler(this.constants.events["write"]);
    }

    erase(note: NoteData) {
        this.music[note.pitch].splice(this.music[note.pitch].indexOf(note), 1);
        this.refresh();
        this.$.triggerHandler(this.constants.events["erase"]);
    }

    lengthen(note: NoteData) {
        if (this.checkExist(note.pitch, note.unitNote, note.start + note.extension + 1)) return;
        note.extension++;
        this.$.triggerHandler(this.constants.events["extension"]);
    }

    shorten(note: NoteData) {
        note.extension--;
        if (note.extension < 0) note.extension = 0;
        this.$.triggerHandler(this.constants.events["extension"]);
    }

    onSelect(handler: () => any): JQuery { return this.$.bind(this.constants.events["select"], handler); }
    onRefresh(handler: () => any): JQuery { return this.$.bind(this.constants.events["refresh"], handler); }
    onWrite(handler: () => any): JQuery { return this.$.bind(this.constants.events["write"], handler); }
    onErase(handler: () => any): JQuery { return this.$.bind(this.constants.events["erase"], handler); }
    onChangeExtension(handler: () => any): JQuery { return this.$.bind(this.constants.events["extension"], handler); }
}