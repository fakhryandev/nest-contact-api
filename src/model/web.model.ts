export class WebResponse<T> {
  data?: T;
  errors?: string;
  paging?: Paging;
}

export class Paging {
  size: number;
  total_pages: number;
  current_page: number;
}
