import { NoticeType } from 'antd/es/message/interface';
import constate from 'constate';
import { useState } from 'react';

export type ToastMessageType = {
  type: NoticeType;
  content: string;
};

const useToastMessageTemp = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessageType>();
  return { toastMessage, setToastMessage };
};

export const [ToastMessageProvider, useToastMessage, useUpdateToastMessage] =
  constate(
    useToastMessageTemp,
    value => value.toastMessage,
    value => value.setToastMessage,
  );
