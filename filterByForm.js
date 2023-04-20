/*
    finds lemma of Greek word and checks if it's already in the list
*/

import * as cheerio from 'cheerio';
import axios from 'axios';
import {readFile, writeFile} from 'fs/promises';

const list = await readDefs();

// async function readVocabList() {
//     try {
//         const data = await readFile('list.txt', 'utf-8');
//         return data.toString().split("\n");
//     } catch (error) {
//         console.log(error)
//     }
// }

async function readDefs() {
    try {
        const defs = await readFile('deck.txt', 'utf-8');
        const data = JSON.parse(defs);
        console.log(data.να);
    } catch(error) {
        console.log(error);
    }
}

//console.log(list);