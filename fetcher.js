import * as cheerio from 'cheerio';
import axios from 'axios';
import {readFile, writeFile} from 'fs/promises';
// import path from 'path';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const vocabList = await readVocabList();
const deck = await getDefinitions(vocabList);
writeToFile(deck);

async function readVocabList() {
    try {
        const data = await readFile('list.txt', 'utf-8');
        return data.toString().split("\n");
    } catch (error) {
        console.log(error)
    }
}

async function getDefinitions(list) {
    const defs = {};
    for(let i = 0; i < 10 /*list.length*/; i++) {
        const def = await getWikiData([list[i]]);
        defs[list[i]] = def;
        console.log("--------------------------");
        console.log(def);
    }
    console.log(`deck has ${defs.length} elements in it`);
    return defs;
}

async function getWikiData(word) {
    console.log(`word is ${word}`);
    const res = await axios.get(`https://en.wiktionary.org/wiki/${word}`);
    const $ = cheerio.load(res.data)
    // remove example sentences
    $('dl').remove();
    // remove citations
    $('.references').remove();
    let ols = $('ol');
   // console.log($(ols).text());
    return $(ols).text();
}

async function writeToFile(data) {
    try {
        await writeFile('deck.txt', JSON.stringify(data));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}