'use server';

export const handleToggleStringFlag = async ({ flagKey, newValue }: { flagKey: string, newValue: string }) => {
  // get the flag  
  const flag = await fetch(`https://app.launchdarkly.com/api/v2/flags/default/${flagKey}`, {
    headers: {
      'Authorization': `${process.env.LAUNCHDARKLY_API_KEY}`,
    },
  });
  if (!flag.ok) {
    throw new Error(`Failed to get flag: ${flag.statusText}`);
  }

  const flagData = await flag.json();
  const variationId = flagData.variations.find((variation: any) => variation.value === newValue)?._id;
  
  const res = await fetch(`https://app.launchdarkly.com/api/v2/flags/default/${flagKey}`, {
    method: 'PATCH',
    body: JSON.stringify({
      "environmentKey": "production",
      "instructions": [{
        "kind": "updateFallthroughVariationOrRollout",
        "variationId": variationId
      }]
    }),
    headers: {
      'Authorization': `${process.env.LAUNCHDARKLY_API_KEY}`,
      'Content-Type': 'application/json; domain-model=launchdarkly.semanticpatch'
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to update flag: ${res.statusText}`);
  }

  return res.json();
};