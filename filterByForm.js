/*
    finds lemma of Greek word and checks if it's already in the list
*/

import * as cheerio from 'cheerio';
import axios from 'axios';
import {readFile, writeFile} from 'fs/promises';

