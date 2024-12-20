import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const darkAtom = atomWithStorage("darkmode", false);
