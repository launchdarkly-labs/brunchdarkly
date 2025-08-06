import { useMutation } from "@tanstack/react-query";
import { handleToggleFlag } from "./handleToggleFlag";

export const ToggleFlag = ({ flagKey, flagValue }: { flagKey: string, flagValue: boolean }) => {


    const mutation = useMutation({
        mutationKey: ['toggleFlag', flagKey],
        mutationFn: handleToggleFlag,
    });

    return (
        <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={flagValue}
          onChange={() => mutation.mutate({ flagKey, flagValue })}
          disabled={mutation.isPending}
          className="sr-only peer"
        />
        <div className={`w-12 h-6 rounded-full relative transition-colors peer-disabled:opacity-50 peer-disabled:cursor-not-allowed ${
          flagValue ? 'bg-green-500' : 'bg-gray-300'
        }`}>
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            flagValue ? 'translate-x-6' : 'translate-x-0.5'
          }`} />
        </div>
        <span className={`text-sm font-medium ${
          flagValue ? 'text-green-700' : 'text-gray-500'
        } ${mutation.isPending ? 'opacity-50' : ''}`}>
          {flagValue ? 'Enabled' : 'Disabled'}
        </span>
      </label>
    );
};