import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

describe('domain events', () => {
  it('shoud be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // subscriber cadastrado, ouvindo o evento
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // criando sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Assegurando que o domain event foi criado, porém não foi disparado ainda
    expect(aggregate.domainEvents).toHaveLength(1)
    expect(aggregate.domainEvents).toEqual([
      expect.objectContaining({
        aggregate: expect.any(CustomAggregate),
        ocurredAt: expect.any(Date),
      }),
    ])
    expect(callbackSpy).not.toHaveBeenCalled()

    // estou salvando a resposta no banco de dados e assim disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O subscriber ouve o evento e executa o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
    expect(aggregate.domainEvents).toEqual([])
  })
})
