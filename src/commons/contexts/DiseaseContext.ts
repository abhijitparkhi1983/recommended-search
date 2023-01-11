import { useState } from 'react';
import constate from 'constate';
import { IDiseaseService } from 'commons/types/module.types';
import { SickResponse } from 'commons/types/response.types';
import { useUpdateToastMessage } from './AlertContext';

type UseDiseaseProps = {
  diseaseService: IDiseaseService;
};

const useDiseasesTemp = ({ diseaseService }: UseDiseaseProps) => {
  const [diseases, setDiseases] = useState<SickResponse[]>();
  const setToastMessage = useUpdateToastMessage();

  const searchDisease = async (query: string) => {
    if (!query) return;

    try {
      const diseasesResult = await diseaseService.search(query);
      setDiseases(diseasesResult);
    } catch (e) {
      console.log('useDisease - error', e);
      setToastMessage({
        type: 'error',
        content: (e as Error).message,
      });
    }
  };

  return {
    diseases,
    searchDisease,
  };
};

export const [DiseaseProvider, useDiseases, useSearchDisease] = constate(
  useDiseasesTemp,
  value => value.diseases,
  value => value.searchDisease,
);
