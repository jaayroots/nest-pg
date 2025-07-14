export class ResponseDto<T = any> {
  status_code: number;
  message: string;
  data: T;

  constructor(partial: Partial<ResponseDto<T>>) {
    Object.assign(this, {
      ...partial,
    });
  }
}
