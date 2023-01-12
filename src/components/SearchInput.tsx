import { SearchOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import debounce from 'commons/utils/debounce';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './SearchInput.styles';
import { OptionType, SearchInputPropsType } from './SearchInput.types';


export default function SearchInput({ options, placeholder, onSearch }: SearchInputPropsType) {
  const [query, setQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<HTMLLIElement[] | null[]>();
  const itemContainerRef = useRef<HTMLUListElement>(null);

  const handleChangeInput = debounce<ChangeEvent<HTMLInputElement>>((arg: ChangeEvent<HTMLInputElement>) => {
    const { value: queryString } = arg.target;

    setQuery(queryString);
    onSearch(queryString);
  }, 300);

  const handleContainerFocus = () => {
    const ref = itemContainerRef.current || null;
    if (ref === null) return;

    ref.tabIndex = -1;
    ref.focus();
  };

  const handleContainerBlur = () => {
    const ref = itemContainerRef.current || null;
    if (ref === null) return;

    ref.tabIndex = 0;
    ref.blur();
  };

  const setInputValue = (value: string) => {
    const ref = inputRef.current || null;
    if (ref === null) return;

    ref.value = value;
  };

  const handleClickItem = (index: number) => () => {
    setFocusedIndex(index);
  };

  const arrowKeyEventController = useCallback(
    (e: KeyboardEvent) => {
      const hasOptions = options.length > 0;

      if (!hasOptions) return;

      if (e.key === 'ArrowDown') {
        handleContainerFocus();
        setFocusedIndex((prev) => (prev + 1 < options.length ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        setFocusedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
      }
      if (e.key === 'Escape') {
        handleContainerBlur();
        setFocusedIndex(-1);
        inputRef.current?.focus();
      }
      if (e.key === 'Enter') {
        const selected = options[focusedIndex];

        onSearch(selected.label);
        setInputValue(selected.label);
        handleContainerBlur();
        setFocusedIndex(-1);
        inputRef.current?.focus();
      }
    },
    [options, focusedIndex]
  );

  useEffect(() => {
    itemRefs.current = Array(options.length).fill(null);

    window.addEventListener('keyup', arrowKeyEventController);
    return () => {
      window.removeEventListener('keyup', arrowKeyEventController);
    };
  }, [arrowKeyEventController]);

  useEffect(() => {
    const ref = itemRefs.current?.[focusedIndex] || null;
    if (ref === null) return;

    ref.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [focusedIndex]);

  return (
    <S.Wrapper>
      <S.InputWrapper>
        <SearchOutlined />
        <input type="text" ref={inputRef} onChange={handleChangeInput} placeholder={placeholder} />

        <button type="button">검색</button>
      </S.InputWrapper>

      <S.ListWrapper ref={itemContainerRef}>
        {((options.length || 0) <= 0 || !query) && <Empty />}

        {query &&
          options.map(({ label: optionLabel }: OptionType, index) => (
            <S.ItemWrapper
              key={uuid()}
              selected={index === focusedIndex}
              onClick={handleClickItem(index)}
              ref={(el) => {
                if (itemRefs?.current?.[index] !== null) return;
                itemRefs.current[index] = el;
              }}>
              <SearchOutlined />

              {optionLabel
                .replaceAll(query, `#$%${query}#$%`)
                .split('#$%')
                .map((e: string) => (
                  <span key={uuid()} style={{ fontWeight: e === query ? '700' : '300' }}>
                    {e}
                  </span>
                ))}
            </S.ItemWrapper>
          ))}
      </S.ListWrapper>
    </S.Wrapper>
  );
}
