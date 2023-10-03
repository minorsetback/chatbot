import { useState } from "react";

const useVoiceflow = () => {
  const [flow, setFlow] = useState<Array<{ reply: boolean; message: string }>>(
    []
  );
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const API_KEY = process.env.NEXT_PUBLIC_VOICEFLOW_API_KEY;

  const interact = (request: { type: string; payload?: string }) => {
    setIsLoading(true);
    fetch(`https://general-runtime.voiceflow.com/state/user/test/interact`, {
      method: "POST",
      headers: {
        Authorization: API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ request }),
    })
      .then((res) => res.json())
      .then((trace) => {
        trace?.forEach((trace: any) => {
          if (trace.type === "speak" || trace.type === "text") {
            setFlow((prev) => [
              ...prev,
              { reply: true, message: trace.payload.message },
            ]);
            setIsLoading(false);
          }
        });
      });
  };
  const handleLaunch = () => {
    interact({ type: "launch" });
  };

  const handleSend = (message: string) => {
    setFlow((prev) => [...prev, { reply: false, message: message }]);
    interact({ type: "text", payload: message });
  };

  return {
    handleLaunch,
    handleSend,
    flow,
    isLoading,
  };
};

export default useVoiceflow;
