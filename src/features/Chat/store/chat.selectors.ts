import {shallowEqual, useSelector} from 'react-redux';
import {RootState} from 'src/store/store.interface';

function useShallowEqualSelector(selector: any) {
  return useSelector(selector, shallowEqual);
}
const ChatSelectors = {
  getConversations: (state: RootState) => {
    return state?.chat?.conversations;
  },
  getIsGenerating: (state: RootState) => {
    return state?.chat?.roomStatus;
  },
};

export {ChatSelectors, useShallowEqualSelector};
