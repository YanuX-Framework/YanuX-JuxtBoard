import { useGlobalStore } from '../store';
import bindActions from '../store/bindActions';
import * as actions from '../store/actions/yanuxCoordinator';

const useYanuxCoordinator = () => {
	const { state, dispatch } = useGlobalStore();
	const { yanuxCoordinator } = state;
	return { yanuxCoordinator, ...bindActions(actions, dispatch) };
}

export default useYanuxCoordinator;