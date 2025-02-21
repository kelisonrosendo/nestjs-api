export class NotFoundError extends Error {
  constructor(entity: string, key: string, attribute: string = 'id') {
    super(`${entity} com ${attribute} = ${key} não encontrado`);
  }
}
