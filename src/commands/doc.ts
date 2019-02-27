import {Command} from '@oclif/command'

export default class Doc extends Command {
  static description = 'Opens the official daSWAG documentation (daswag.tech/documentation) in a browser, and searches for a given keyword.'
  async run() {
    this.log('Coming soon.')
  }
}
