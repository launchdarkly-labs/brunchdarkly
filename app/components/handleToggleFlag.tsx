'use server';

export  const handleToggleFlag = async ({ flagKey, flagValue }: { flagKey: string, flagValue: boolean }) => {
    const res = await fetch(`https://app.launchdarkly.com/api/v2/flags/default/${flagKey}`, {
        method: 'PATCH',
        body: JSON.stringify(
            {
                "environmentKey": "production",
                "instructions": [ { "kind": flagValue ? "turnFlagOff" : "turnFlagOn" } ]
            }
        ),
        headers: {
            'Authorization': `${process.env.LAUNCHDARKLY_API_KEY}`,
            'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
        },
    });

  }