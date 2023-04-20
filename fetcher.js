import * as cheerio from 'cheerio';
import axios from 'axios';
import {readFile, writeFile} from 'fs/promises';

const vocabList = await readVocabList();
const deck = await getDefinitions(vocabList);
writeToFile(deck);

async function readVocabList() {
    try {
        const data = await readFile('list.txt', 'utf-8');
        return data.toString().split("\r\n");
    } catch (error) {
        console.log(error)
    }
}

async function getDefinitions(list) {
    const defs = [];
    for(let i = 0; i < list.length; i++) {
        const def = await getWikiData([list[i]]);
        defs[i] = [list[i], def];
        console.log("--------------------------");
        console.log(defs);
    }
    console.log(`deck has ${defs.length} elements in it`);
    return defs;
}

async function getWikiData(word) {
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
        await writeFile('deck.txt', data.join('\n'));
        console.log("file written successfully!");
    } catch (error) {
        console.log(error);
    }
}