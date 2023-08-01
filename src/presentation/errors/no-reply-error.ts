export class NoReplyError extends Error {
    constructor (paramName: string) {
      super(`Reply Register: ${paramName}`)
      this.name = 'Reply Register'
    }
  }
  