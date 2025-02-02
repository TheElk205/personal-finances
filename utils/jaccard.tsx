'use strict';
// Adapted from: https://www.npmjs.com/package/jaccard-similarity-sentences as it dit not work with modern typescirpt (8 years ol)
import natural from "natural";

const tokenizer = new natural.WordTokenizer();
const stopWords = ['a', 'the', 'to', 'when', 'about', 'by', 'and', 'with'];

/**************************************************************************

 Normalize the words into every sentence

 1. Extract the words out of it
 2. Apply stemming
 3. Remove the stop words

 **************************************************************************/

const isStopWord = function (word: string) {
    return stopWords.includes(word)
}

const removeEqualWords = function (words: string[]) {
    for(let i = 0; i < words.length; i++) {
        for(let j = i + 1; j < words.length; j++) {
            if(words[i] === words[j]) {
                const head = words.slice(0,j);
                const tail = words.slice(j+1);
                words = head.concat(tail);
                j = j - 1;
            }
        }
    }
    return words;
}

const normalizing = function (sentence: string) {
    const words = tokenizer.tokenize(sentence);
    return words.filter( word => !isStopWord(word)).map( word => natural.PorterStemmer.stem(word))
}

const exists = function(word: string, array: string[]) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] === word) {
            return true;
        }
    }
    return false;
}

const identicalWordsInSentence =  function(list1: string[], list2: string[]) {
    const identical = [];
    for(let i = 0; i < list1.length; i ++) {
        for(let j = 0; j < list2.length; j++) {
            if(list1[i] === list2[j] && !(exists(list1[i], identical))) {
                identical.push(list1[i]);
            }
        }
    }
    return identical;
}

export default function jaccardSimilarity(sentence1: string, sentence2: string) {
    const a = normalizing(sentence1.replace(" ", "").toLowerCase());
    const b = normalizing(sentence2.replace(" ", "").toLowerCase());
    const identical = identicalWordsInSentence(a, b);
    return (identical.length / (a.length + b.length - identical.length));
}
