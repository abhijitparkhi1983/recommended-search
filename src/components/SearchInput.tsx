import { SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { useDiseases, useSearchDisease } from 'commons/contexts/DiseaseContext';
import { SickResponse } from 'commons/types/response.types';
import debounce from 'commons/utils/debounce';
import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './SearchInput.styles';

export default function SearchInput() {
  const [query, setQuery] = useState('');

  const searchDisease = useSearchDisease();
  const diseases = useDiseases();

  const handleChangeInput = debounce<ChangeEvent<HTMLInputElement>>(
    (arg: ChangeEvent<HTMLInputElement>) => {
      const { value } = arg.target;

      setQuery(value);
      searchDisease(value);
    },
    300,
  );

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <SearchOutlined />
        <input
          type='search'
          onChange={handleChangeInput}
          placeholder='질환명을 입력해주세요.'
        />

        <button type='button'>검색</button>
      </S.InputWrapper>

      <S.ListWrapper>
        {((diseases?.length || 0) <= 0 || !query) && <Empty />}

        {query &&
          diseases?.map(({ sickNm }: SickResponse) => (
            <S.ItemWrapper href={`#${sickNm}`}>
              <SearchOutlined style={{ marginRight: '12px' }} />
              {sickNm
                .replaceAll(query, `#$%${query}#$%`)
                .split('#$%')
                .map(e => (
                  <span
                    key={uuid()}
                    style={{ fontWeight: e === query ? '700' : '300' }}
                  >
                    {e}
                  </span>
                ))}
            </S.ItemWrapper>
          ))}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
