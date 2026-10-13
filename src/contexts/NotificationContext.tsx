import { NotificationStatus } from '../types/NotificationStatus.ts';
import { createContext, ReactNode, useContext, useState } from 'react';

const NotificationGetContext = createContext<NotificationStatus>({
  severity: 'success',
  message: 'This is a success message!',
  visible: false,
});
const NotificationSetContext = createContext<
  (data: NotificationStatus) => void
>(() => {});

type Props = {
  readonly children: ReactNode;
};

function NotificationProvider({ children }: Props) {
  const [state, setState] = useState<NotificationStatus>({
    severity: 'success',
    message: 'This is a success message!',
    visible: false,
  });

  return (
    <NotificationGetContext.Provider value={state}>
      <NotificationSetContext.Provider value={setState}>
        {children}
      </NotificationSetContext.Provider>
    </NotificationGetContext.Provider>
  );
}

function useNotification() {
  const state = useContext(NotificationGetContext);
  const setState = useContext(NotificationSetContext);

  return {
    notificationStatus: state,
    setNotificationStatus: setState,
  };
}

export { NotificationProvider, useNotification };
