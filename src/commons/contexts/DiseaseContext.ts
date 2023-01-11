import { useEffect, useState } from 'react';
import constate from 'constate';
import { IDiseaseService } from 'commons/types/module.types';
import { SickResponse } from 'commons/types/response.types';

type UseDiseaseProps = {
  diseaseService: IDiseaseService;
};

const useDisease = ({ diseaseService }: UseDiseaseProps) => {
  const [diseases, setDiseases] = useState<SickResponse[]>();

  useEffect(() => {
    console.log(diseases);
  }, [diseases]);

  const searchDisease = async (query: string) => {
    // TODO : 로딩 중, 예외처리 하기
    try {
      const diseasesResult = await diseaseService.search(query);
      setDiseases(diseasesResult);
    } catch (e) {
      console.log('useDisease -error', e);
    }
  };

  return {
    diseases,
    searchDisease,
  };
};

export const [DiseaseProvider, useDiseases, useSearchDisease] = constate(
  useDisease,
  value => value.diseases,
  value => value.searchDisease,
);
