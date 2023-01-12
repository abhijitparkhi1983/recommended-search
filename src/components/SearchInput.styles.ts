import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin-top: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const InputWrapper = styled.div`
  border: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 16px;
  border-color: #c2c8ce;
  background-color: white;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgb(30 32 37 / 10%);
  cursor: pointer;

  svg {
    margin: 0px 12px;
  }

  input {
    flex: 10;
    width: 100%;
    height: 100%;
    border: none;
    display: block;
    margin: 8px;
    min-height: 30px;
  }

  button {
    width: 100%;
    flex: 2;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #357ae1;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

export const ListWrapper = styled.ul`
  width: 100%;
  padding: 12px;
  display: flex;
  margin-top: 8px;
  overflow: scroll;
  max-height: 400px;
  border-radius: 16px;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgb(30 32 37 / 10%);
`;

export const ItemWrapper = styled.li`
  display: block;
  padding: 8px;
  margin: 3px;
  width: 100%;
  border-radius: 8px;
  :hover {
    background-color: #f3f6fa;
  }
`;
