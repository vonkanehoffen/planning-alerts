import { useMemo } from "react";
import { MessageContext, useFCMessages } from "../../App";

function flattenIds(messages: MessageContext): Array<string> {
  let flat: any = [];
  for (const m of messages) {
    if (m.newPaIds) flat.push.apply(flat, JSON.parse(m.newPaIds));
  }
  return flat;
}

/**
 * Returns a flattened list of PA IDs from FCM messages
 */
export function useAlertedNewPaIds() {
  const messages = useFCMessages();
  return useMemo(() => flattenIds(messages), [messages]);
}
