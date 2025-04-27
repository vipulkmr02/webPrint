export interface PrintJob {
  fileName: string;
  printer: string
  title?: string;
  pageList?: number[];
  copies: number;
  doubleSided: boolean;
}

// interface Options {
//   resourceUri: string,
//   printer: string,
//   jobOpts?: string[]  skipping it
//   pageList?: number[]
//   copies?: number
//   reversePageList?: boolean
// }
