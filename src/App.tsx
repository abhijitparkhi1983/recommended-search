import SearchInput from 'components/SearchInput';
import styled from 'styled-components';
import { message } from 'antd';
import { useToastMessage } from 'commons/contexts/AlertContext';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (!toastMessage) return;
    messageApi.open({ ...toastMessage });
  }, [toastMessage]);

  return (
    <>
      {contextHolder}
      <Wrapper>
        <SearchInput />
      </Wrapper>
    </>
  );
}

export default App;
