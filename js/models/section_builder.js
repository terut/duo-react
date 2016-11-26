'use strict'

import Section from './section.js'
import Sentence from './sentence.js'
import SectionJSON from '../../assets/jsons/all.json'

export default class SectionBuilder {
  build() {
    const chunkSize = 2

    var sections = []
    for(var i = 0; i < SectionJSON.length; i += chunkSize) {
      var row = []
      SectionJSON.slice(i, i + chunkSize).forEach((json) => {
        var sentences = []
        json["sentences"].forEach((s) => {
          const sentence = new Sentence(s["number"], s["en"], s["jp"])
          sentences.push(sentence)
        })
        const section = new Section(json["section"], sentences)
        row.push(section)
      })
      sections.push(row)
    }
    return sections
  }
}
