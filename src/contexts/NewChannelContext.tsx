import { createContext, ReactNode, useContext, useState } from 'react';
import { WayareaPolygon } from '../types/WayareaPolygon.ts';

const ChannelGetContext = createContext<WayareaPolygon | undefined>(undefined);
const ChannelSetContext = createContext<(data?: WayareaPolygon) => void>(
  () => {}
);

type Props = {
  readonly children: ReactNode;
};

function ChannelProvider({ children }: Props) {
  const [state, setState] = useState<WayareaPolygon>();

  return (
    <ChannelGetContext.Provider value={state}>
      <ChannelSetContext.Provider value={setState}>
        {children}
      </ChannelSetContext.Provider>
    </ChannelGetContext.Provider>
  );
}

function useChannel() {
  const state = useContext(ChannelGetContext);
  const setState = useContext(ChannelSetContext);

  return {
    channelArea: state,
    setChannelArea: setState,
  };
}

export { ChannelProvider, useChannel };
