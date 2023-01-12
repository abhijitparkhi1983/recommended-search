import { SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import debounce from 'commons/utils/debounce';
import { ChangeEvent, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './SearchInput.styles';
import { OptionType, SearchInputPropsType } from './SearchInput.types';

export default function SearchInput({
  options,
  placeholder,
  onSearch,
  onChange,
}: SearchInputPropsType) {
  const [query, setQuery] = useState('');

  const handleChangeInput = debounce<ChangeEvent<HTMLInputElement>>(
    (arg: ChangeEvent<HTMLInputElement>) => {
      const { value: queryString } = arg.target;

      setQuery(queryString);
      onSearch(queryString);
    },
    300,
  );

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <SearchOutlined />
        <input
          type='text'
          onChange={handleChangeInput}
          placeholder={placeholder}
        />

        <button type='button'>검색</button>
      </S.InputWrapper>

      <S.ListWrapper role='listbox' id='search-list'>
        {((options?.length || 0) <= 0 || !query) && <Empty />}

        {query &&
          options?.map(
            ({ value: optionValue, label: optionLabel }: OptionType) => (
              <S.ItemWrapper key={uuid()}>
                <a href={optionValue}>
                  <SearchOutlined style={{ marginRight: '12px' }} />

                  {optionLabel
                    .replaceAll(query, `#$%${query}#$%`)
                    .split('#$%')
                    .map((e: string) => (
                      <span
                        key={uuid()}
                        style={{ fontWeight: e === query ? '700' : '300' }}
                      >
                        {e}
                      </span>
                    ))}
                </a>
              </S.ItemWrapper>
            ),
          )}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
