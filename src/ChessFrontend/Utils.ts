export enum SquareUIState { // Represents additional UI states that a square can take on
    Selected,
    Highlighted
}

export type Position = [number, number]; // Better explicity typing

export let ColumnTranslate = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h"
]; // translate columns into letters

export let RowTranslate = [
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
]