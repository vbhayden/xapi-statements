declare module 'accept-language-parser' {
  interface Lang {
    code: string;
    region?: string;
    quality: number,
  }
  interface Export {
    parse: (header: string) => Lang[];
  }
  const x: Export;
  export = x;
}
