import { useQuery } from '@tanstack/react-query';
import { fetch } from 'expo/fetch';

import { Config } from '@/constants/Config';

type CatFact = {
  fact: string;
  length: number;
};

export const useCatFacts = () =>
  useQuery({
    queryFn: async () => {
      try {
        const responseFact = await fetch(`${Config.CAT_FACT_URL}/fact`, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        const dataFact: CatFact = await responseFact.json();

        return dataFact;
      } catch (e) {
        return null;
      }
    },
    queryKey: ['catFact'],
  });
