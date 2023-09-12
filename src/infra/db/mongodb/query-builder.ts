export class QueryBuilder {
  private readonly query = []

  private addStep (step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data
    })
    return this
  }

  private addStepOther(step:string,data:number): QueryBuilder {
    this.query.push({
      [step]:data
    })
    return this
  }

  private addStepCounter(step:string,data:string):QueryBuilder {
    this.query.push({
      [step]:data
    })
    return this
  }

  match (data: object): QueryBuilder {
    return this.addStep('$match', data)
  }

  group (data: object): QueryBuilder {
    return this.addStep('$group', data)
  }

  sort (data: object): QueryBuilder {
    return this.addStep('$sort', data)
  }

  unwind (data: object): QueryBuilder {
    return this.addStep('$unwind', data)
  }

  lookup (data: object): QueryBuilder {
    return this.addStep('$lookup', data)
  }
  set(data:object): QueryBuilder {
    return this.addStep('$set',data)
  }

  project (data: object): QueryBuilder {
    return this.addStep('$project', data)
  }

  addFields (data: object): QueryBuilder {
    return this.addStep('$addFields', data)
  }
  skip(data:number): QueryBuilder {
    return  this.addStepOther('$skip',data as number)
  }
  limit(data:number):QueryBuilder {
    return this.addStepOther('$limit',data as number)
  }

  count(data:string):QueryBuilder {
    return this.addStepCounter('$count',data)
  }

  build (): object[] {
    return this.query
  }


}
