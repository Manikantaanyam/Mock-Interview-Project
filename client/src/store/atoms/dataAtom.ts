import { atom } from "recoil";

interface Data {
  id: string;
  techStack: string;
  question: string;
  answer: string;
}

export const dataAtom = atom<Data[]>({
  key: "dataAtom",
  default: [],
});
