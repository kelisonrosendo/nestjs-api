export class AlreadyExistsError extends Error {
  constructor(entity: string, key: string, attribute: string) {
    super(`${entity} com ${attribute} = ${key} já existe`);
  }
}
