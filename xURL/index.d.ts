/* ------------------- */
/* -xURLProxy Classes- */
interface xURLProxyInterface<T extends object> extends URL {
  proxyHandler: ProxyHandler<T>;
}

type xURLProxyConstructorType = (
  url: URL | string,
  base?: URL | string
) => xURLProxyInterface;

type AssignProxyHandlerType<T extends object> = (
  target: ProxyHandler<T>,
  ...source: ProxyHandler<T>[]
) => ProxyHandler<T>;

interface xProxyHandler<T extends object> extends ProxyHandler<T> {
  get(target: T, p: string | symbol, receiver: any): any;
  set(target: T, p: string | symbol, value: any, receiver: any): boolean;
}

/* ------------- */
/* -xURL Classes- */
interface xURLInterface extends xURLProxyInterface {
  readonly searchParams: xURLSearchParamsType;
  readonly pathname_sup: string;
  pathname_sub: string;
  fetch: FetchType;
  fetchToJson: FetchToJsonType;
  update(): void;
}

type xURLConstructorType = (
  url: URL | string,
  base?: URL | string
) => xURLInterface;

type FetchMethodType = "GET" | "PUSH";
type FetchType<T extends object | undefined> = (
  params?: T,
  method?: FetchMethodType,
  init?: RequestInit
) => Promise<Response>;
type FetchToJsonType<T extends object | undefined, D extends object> = (
  params?: T,
  method?: FetchMethodType
) => Promise<D>;

type PathnameCheckType = () => boolean;

class xURLSearchParamsType<T extends object> extends URLSearchParams {
  assign(...source: T[]): void;
}

/* ------------- */
/* -API Classes- */
interface xAPIInterface extends xURLInterface {
  readonly endpoint: string;
}
