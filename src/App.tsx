import SearchInput from 'components/SearchInput';
import styled from 'styled-components';
import { message } from 'antd';
import { useToastMessage } from 'commons/contexts/AlertContext';
import { useEffect } from 'react';
import { useDiseases, useSearchDisease } from 'commons/contexts/DiseaseContext';
import { SickResponse } from 'commons/types/response.types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  background-color: #d1e8fd;
`;

function App() {
  const toastMessage = useToastMessage();
  const [messageApi, contextHolder] = message.useMessage();

  const diseases = useDiseases();
  const searchDisease = useSearchDisease();

  useEffect(() => {
    if (!toastMessage) return;
    messageApi.open({ ...toastMessage });
  }, [toastMessage, messageApi]);

  return (
    <>
      {contextHolder}
      <Wrapper>
        <SearchInput
          options={
            diseases?.map(({ sickCd, sickNm }: SickResponse) => ({
              value: sickCd,
              label: sickNm,
            })) || []
          }
          onSearch={searchDisease}
          placeholder="질병명을 검색해주세요."
        />
      </Wrapper>
    </>
  );
}

export default App;
