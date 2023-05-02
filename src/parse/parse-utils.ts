import { fireTrigger } from "../data/state";

export function fireIfTrigger(response: string): string {
  if (response.substring(0, 2) === ">>") {
    return fireTrigger(response.substring(2));
  }
  return response;
}
